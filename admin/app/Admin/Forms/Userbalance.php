<?php

namespace App\Admin\Forms;

use App\Models\TransferLog;
use Dcat\Admin\Traits\LazyWidget;
use Dcat\Admin\Contracts\LazyRenderable;
use Dcat\Admin\Widgets\Form;
use App\Models\Users;
use App\Models\UserOperateLog;
use App\Services\Lib;

class Userbalance extends Form implements LazyRenderable
{
    use LazyWidget; // 使用异步加载功能
    /**
     * Handle the form request.
     *
     * @param array $input
     *
     * @return mixed
     */
    public function handle(array $input)
    {
        $id = $this->payload['id'] ?? null;

        $balance= $input['balance'] ?? 0;
        if (! $id) {
            return $this->response()->error('参数错误');
        }

        if (!is_numeric($balance)) {
            return $this->response()->error('金额输入错误');
        }

        $user = Users::query()->find($id);
        if (! $user) {
            return $this->response()->error('用户不存在');
        }

        if($user->balance+$balance<0){
            return $this->response()->error('账户余额不足，无法完成扣除操作');
        }

        $arr = [
            'order_no' => time().rand(1000,9999),
            'api_type' => 'web',
            'user_id' => $user->id,
            'transfer_type' => ($balance<0) ? 4 : 3 ,
            'money' => $balance,
            'cash_fee' => 0,
            'real_money' => abs($balance),
            'before_money' => $user->balance,
            'after_money' => $user->balance+$balance,
            'state' => 1,
            'remark' => $input['balance_source']
        ];
        TransferLog::create($arr);
        $user->balance = $user->balance+$balance;

        $user->save();
          $ip =$_SERVER['REMOTE_ADDR'];
            $res = Lib::getIpAddress($ip);
            $res = json_decode($res, true);
            $ip_address = '';
            if ($res['code'] == 200) {
                $ip_address = $res['data']['country'] . $res['data']['province'] . $res['data']['city'];
            }
 UserOperateLog::insertLog($user->id, 7, $_SERVER['HTTP_USER_AGENT'], $ip, $ip_address, '管理员调整【' . $user->username . '】账户余额，调整金额数'.$balance.'，调整前金额'.$user->balance.'，调整后金额'.$user->balance);
 

        return $this->response()->success('账户余额调整成功')->refresh();

    }

    /**
     * Build a form here.
     */
    public function form()
    {
        //$this->confirm('您确定要调整余额吗', 'content');
        $this->text('balance','调整金额')->rules('required')->default(0.00)->help('输入调整金额，整数为增加，负数为扣除');
        $this->text('balance_source','资金来源');
    }
}
