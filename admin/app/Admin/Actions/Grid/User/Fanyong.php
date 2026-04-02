<?php

namespace App\Admin\Actions\Grid\User;


use App\Models\SystemConfig;
use App\Models\Users;
use App\Models\TransferLog;
use App\Services\Lib;
use App\Services\GamereportService;
use Dcat\Admin\Actions\Response;
use Dcat\Admin\Grid\RowAction;
use Dcat\Admin\Traits\HasPermissions;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Models\Recharge;
use App\Models\RedEnvelopes;
use App\Models\Userredpacket;
use App\User;

class Fanyong extends RowAction
{
    /**
     * @return string
     */
	protected $title = '立即返佣';

    /**
     * Handle the action request.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function handle(Request $request)
    {
        $id = $this->getKey();
        $money = 0;
        $settlementday = intval(SystemConfig::getValue('settlement'));
        $diffday = strtotime(date('Y-m-d'))-$settlementday*60*60*24;
        $val = User::where('isagent','=',1)->where('id','=',$id)->first();
        if ($val){
            $transfermoney = TransferLog::where("state",2)->where('user_id',$val->id)->where('transfer_type',20)->sum('money');

            $child = User::getChild($val->id);
            $list = User::whereIn('id',$child)->get();
            $totalfanhui = 0;
            $totalredpacketSum =0;
            $totalRechargeredpacketSum =0;
            foreach ($list as $k => $v) {
                //反水
                $totalfanhui += User::totalfanhui($v->id, date('Y-m-d', $diffday) . ' 00:00:00', date('Y-m-d', time()) . ' 23:59:59');
                //紅包
                $totalredpacketSum +=   User::redpacketSum($v->id, date('Y-m-d', $diffday) . ' 00:00:00', date('Y-m-d', time()) . ' 23:59:59');
                // 充值送红包
                $totalRechargeredpacketSum +=   User::RechargeredpacketSum($v->id, date('Y-m-d', $diffday) . ' 00:00:00', date('Y-m-d', time()) . ' 23:59:59');
            }
            $user = User::where('id',$val->id)->first();
            // $money =  $transfermoney -  $totalfanhui - $totalredpacketSum - $totalRechargeredpacketSum;
            $money = $transfermoney;
            // dd($money);
            if ($money>0) {

                $user->balance = $user->balance + $money;

                TransferLog::where("state",2)->where('user_id',$val->id)->where('transfer_type',20)->update(['state'=>1]);
            }
                $user->settlementday = strtotime(date('Y-m-d'));
                $user->save();
        }        
        

        return $this->response()->success('成功领取返佣'.$money)->refresh();
    }


    /**
	 * @return string|array|void
	 */
	public function confirm()
	{
		return ['确定立即返佣', ''];
	}

    /**
     * @param Model|Authenticatable|HasPermissions|null $user
     *
     * @return bool
     */
    protected function authorize($user): bool
    {
        return true;
    }
}
