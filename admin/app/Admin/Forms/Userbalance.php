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
    use LazyWidget; // Enable lazy loading
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
            return $this->response()->error('Invalid parameter');
        }

        if (!is_numeric($balance)) {
            return $this->response()->error('Invalid amount');
        }

        $user = Users::query()->find($id);
        if (! $user) {
            return $this->response()->error('User not found');
        }

        if($user->balance+$balance<0){
            return $this->response()->error('Insufficient balance to complete the deduction');
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
 UserOperateLog::insertLog($user->id, 7, $_SERVER['HTTP_USER_AGENT'], $ip, $ip_address, 'Admin adjusted balance for [' . $user->username . ']: adjustment=' . $balance . ', before=' . $user->balance . ', after=' . $user->balance);
 

        return $this->response()->success('Account balance adjusted successfully')->refresh();

    }

    /**
     * Build a form here.
     */
    public function form()
    {
        //$this->confirm('Are you sure you want to adjust the balance?', 'content');
        $this->text('balance','Adjust Amount')->rules('required')->default(0.00)->help('Enter adjustment amount; positive to add, negative to deduct');
        $this->text('balance_source','Funding Source');
    }
}
