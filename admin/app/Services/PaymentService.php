<?php

namespace App\Services;

use App\Models\Recharge;
use App\Models\User;
use App\Models\PaymentChannel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PaymentService
{
    protected $user;
    protected $channel;
    protected $amount;
    protected $orderNo;

    public function __construct(User $user, PaymentChannel $channel, float $amount)
    {
        $this->user = $user;
        $this->channel = $channel;
        $this->amount = $amount;
        $this->orderNo = $this->generateOrderNo();
    }

    public function createPayment()
    {
        try {
            // 创建充值记录
            $recharge = Recharge::create([
                'order_no' => $this->orderNo,
                'user_id' => $this->user->id,
                'amount' => $this->amount,
                'pay_way' => $this->channel->id,
                'state' => 0,
                'info' => $this->channel->name
            ]);

            // 根据支付渠道创建支付
            $paymentData = $this->createChannelPayment($recharge);

            // 缓存支付信息
            $this->cachePaymentInfo($recharge, $paymentData);

            return [
                'success' => true,
                'data' => [
                    'order_no' => $this->orderNo,
                    'payment_data' => $paymentData
                ]
            ];
        } catch (\Exception $e) {
            Log::error('创建支付失败: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => '创建支付失败'
            ];
        }
    }

    protected function createChannelPayment($recharge)
    {
        switch ($this->channel->type) {
            case 'alipay':
                return $this->createAlipayPayment($recharge);
            case 'wechat':
                return $this->createWechatPayment($recharge);
            case 'bank':
                return $this->createBankPayment($recharge);
            default:
                throw new \Exception('不支持的支付渠道');
        }
    }

    protected function createAlipayPayment($recharge)
    {
        // 支付宝支付逻辑
        $config = [
            'app_id' => $this->channel->config['app_id'],
            'private_key' => $this->channel->config['private_key'],
            'public_key' => $this->channel->config['public_key'],
            'notify_url' => route('payment.alipay.notify'),
            'return_url' => route('payment.alipay.return'),
        ];

        $order = [
            'out_trade_no' => $this->orderNo,
            'total_amount' => $this->amount,
            'subject' => '充值' . $this->amount . '元',
        ];

        // 调用支付宝SDK创建支付
        return $this->callAlipaySDK($config, $order);
    }

    protected function createWechatPayment($recharge)
    {
        // 微信支付逻辑
        $config = [
            'app_id' => $this->channel->config['app_id'],
            'mch_id' => $this->channel->config['mch_id'],
            'key' => $this->channel->config['key'],
            'notify_url' => route('payment.wechat.notify'),
        ];

        $order = [
            'out_trade_no' => $this->orderNo,
            'total_fee' => $this->amount * 100, // 转换为分
            'body' => '充值' . $this->amount . '元',
        ];

        // 调用微信支付SDK创建支付
        return $this->callWechatSDK($config, $order);
    }

    protected function createBankPayment($recharge)
    {
        // 银行卡支付逻辑
        return [
            'bank_name' => $this->channel->config['bank_name'],
            'account_name' => $this->channel->config['account_name'],
            'account_number' => $this->channel->config['account_number'],
            'amount' => $this->amount,
            'order_no' => $this->orderNo
        ];
    }

    protected function generateOrderNo()
    {
        return date('YmdHis') . Str::random(6);
    }

    protected function cachePaymentInfo($recharge, $paymentData)
    {
        $cacheKey = 'payment_' . $this->orderNo;
        Cache::put($cacheKey, [
            'recharge_id' => $recharge->id,
            'user_id' => $this->user->id,
            'amount' => $this->amount,
            'channel' => $this->channel->type,
            'payment_data' => $paymentData
        ], now()->addHours(24));
    }

    public function handlePaymentCallback($data)
    {
        try {
            $cacheKey = 'payment_' . $data['order_no'];
            $paymentInfo = Cache::get($cacheKey);

            if (!$paymentInfo) {
                throw new \Exception('支付信息不存在或已过期');
            }

            // 验证支付回调
            if (!$this->verifyPaymentCallback($data)) {
                throw new \Exception('支付验证失败');
            }

            // 更新充值记录
            $recharge = Recharge::find($paymentInfo['recharge_id']);
            $recharge->state = 2; // 支付成功
            $recharge->save();

            // 更新用户余额
            $user = User::find($paymentInfo['user_id']);
            $user->balance += $paymentInfo['amount'];
            $user->save();

            // 清除缓存
            Cache::forget($cacheKey);

            return [
                'success' => true,
                'message' => '支付处理成功'
            ];
        } catch (\Exception $e) {
            Log::error('处理支付回调失败: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    protected function verifyPaymentCallback($data)
    {
        switch ($this->channel->type) {
            case 'alipay':
                return $this->verifyAlipayCallback($data);
            case 'wechat':
                return $this->verifyWechatCallback($data);
            case 'bank':
                return $this->verifyBankCallback($data);
            default:
                return false;
        }
    }

    protected function verifyAlipayCallback($data)
    {
        // 支付宝回调验证逻辑
        return true;
    }

    protected function verifyWechatCallback($data)
    {
        // 微信支付回调验证逻辑
        return true;
    }

    protected function verifyBankCallback($data)
    {
        // 银行卡支付验证逻辑
        return true;
    }
} 