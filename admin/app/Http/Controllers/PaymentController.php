<?php

namespace App\Http\Controllers;

use App\Models\PaymentChannel;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class PaymentController extends Controller
{
    public function index()
    {
        $channels = PaymentChannel::where('status', true)
            ->orderBy('sort')
            ->get();

        return view('payment.index', compact('channels'));
    }

    public function create(Request $request)
    {
        $request->validate([
            'channel_id' => 'required|exists:payment_channels,id',
            'amount' => 'required|numeric|min:1'
        ]);

        $channel = PaymentChannel::findOrFail($request->channel_id);
        
        if (!$channel->isAvailable()) {
            return back()->with('error', '该支付渠道暂时不可用');
        }

        if (!$channel->validateAmount($request->amount)) {
            return back()->with('error', sprintf('请输入金额在%.2f-%.2f之间！', 
                $channel->min_amount, 
                $channel->max_amount
            ));
        }

        $paymentService = new PaymentService(Auth::user(), $channel, $request->amount);
        $result = $paymentService->createPayment();

        if (!$result['success']) {
            return back()->with('error', $result['message']);
        }

        return view('payment.pay', [
            'order_no' => $result['data']['order_no'],
            'payment_data' => $result['data']['payment_data'],
            'channel' => $channel
        ]);
    }

    public function checkStatus(Request $request)
    {
        $request->validate([
            'order_no' => 'required|string'
        ]);

        $cacheKey = 'payment_' . $request->order_no;
        $paymentInfo = Cache::get($cacheKey);

        if (!$paymentInfo) {
            return response()->json([
                'success' => false,
                'message' => '订单不存在或已过期'
            ]);
        }

        $recharge = Recharge::where('order_no', $request->order_no)->first();

        return response()->json([
            'success' => true,
            'data' => [
                'status' => $recharge->state,
                'message' => $this->getStatusMessage($recharge->state)
            ]
        ]);
    }

    public function alipayNotify(Request $request)
    {
        $paymentService = new PaymentService(null, PaymentChannel::where('type', 'alipay')->first(), 0);
        $result = $paymentService->handlePaymentCallback($request->all());

        if ($result['success']) {
            return 'success';
        }
        return 'fail';
    }

    public function wechatNotify(Request $request)
    {
        $paymentService = new PaymentService(null, PaymentChannel::where('type', 'wechat')->first(), 0);
        $result = $paymentService->handlePaymentCallback($request->all());

        if ($result['success']) {
            return response()->xml(['return_code' => 'SUCCESS', 'return_msg' => 'OK']);
        }
        return response()->xml(['return_code' => 'FAIL', 'return_msg' => $result['message']]);
    }

    protected function getStatusMessage($state)
    {
        switch ($state) {
            case 0:
                return '待支付';
            case 1:
                return '支付中';
            case 2:
                return '支付成功';
            case 3:
                return '支付失败';
            default:
                return '未知状态';
        }
    }
} 