<?php

namespace App\Admin\Forms;

use App\Models\ActivityApply;
use App\Models\GameRecord;
use App\Models\Message;
use App\Models\Recharge;
use App\Models\Suggestion;
use App\Models\SystemConfig;
use App\Models\TransferLog;
use App\Models\UserCard;
use App\Models\UserOperateLog;
use App\Models\Usersmoney;
use App\Models\Withdraw;
use App\User;
use Dcat\Admin\Widgets\Form;

class ClearForm extends Form
{
    /**
     * Handle the form request.
     *
     * @param array $input
     *
     * @return mixed
     */
    public function handle(array $input)
    {
        $save_days = $input['save_days'] ?? '';
        $time = date('Y-m-d',strtotime("-".$save_days." days"));
        if ($save_days != '') {

        }
        foreach ($input['clear'] as $k => $v) {
            if ($v == "users_table") {
                $uids = User::whereDate('created_at','<',$time)->where('isagent',0)->pluck('id');
                Withdraw::whereIn('user_id',$uids)->delete();
                GameRecord::whereIn('user_id',$uids)->delete();
                Recharge::whereIn('user_id',$uids)->delete();
                UserOperateLog::whereIn('user_id',$uids)->delete();
                TransferLog::whereIn('user_id',$uids)->delete();
                UserCard::whereIn('user_id',$uids)->delete();
                Suggestion::whereIn('user_id',$uids)->delete();
                Message::whereIn('user_id',$uids)->delete();
                Usersmoney::whereIn('user_id',$uids)->delete();
                ActivityApply::whereIn('user_id',$uids)->delete();
                User::whereDate('created_at','<',$time)->where('isagent',0)->delete();
            }
            if ($v == "game_record_table") {
                GameRecord::whereDate('created_at','<',$time)->delete();
            }
            if ($v == "finance_table") {
                Recharge::whereDate('created_at', '<', $time)->delete();
                Withdraw::whereDate('created_at', '<', $time)->delete();
                TransferLog::whereDate('created_at', '<', $time)->delete();
            }
            if ($v == "agent_table") {
                User::whereDate('created_at','<',$time)->where('isagent',1)->delete();
            }
            if ($v == "activity_table") {
                ActivityApply::whereDate('created_at', '<', $time)->delete();
            }
            if ($v == "log_table") {
                UserOperateLog::whereDate('created_at', '<', $time)->delete();
            }
        }
        return $this
            ->response()
            ->success('Operation successful')
            ->refresh();
    }

    /**
     * Build a form here.
     */
    public function form()
    {
        $this->confirm('Are you sure you want to clear?', '');
        $this->tab('Data Cleanup', function () {
            $options = ['users_table' => 'Member Data', 'game_record_table' => 'Betting Data', 'finance_table' => 'Finance Data'
                        ,'agent_table' => 'Agent Data','activity_table' => 'Activity Data','log_table' => 'Log Data'];
            $this->checkbox('clear', 'Data Cleanup')->options($options);
            // $this->text('users_table','Member data retention days');
            // $this->text('game_record_table','Betting data retention days');
            // $this->text('finance_table','Finance data retention days');
            // $this->text('syslogday', 'Agent data retention days');
            // $this->text('syslogday', 'Activity data retention days');
            // $this->text('syslogday', 'Log data retention days');
            $this->number('save_days', 'Retention Days');
        });
    }

    /**
     * The data of the form.
     *
     * @return array
     */
    public function default()
    {
        return [
            'name'  => 'John Doe',
            'email' => 'John.Doe@gmail.com',
        ];
    }

}
