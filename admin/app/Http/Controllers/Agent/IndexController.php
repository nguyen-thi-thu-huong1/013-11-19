<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\GameRecord;
use App\Models\Message;
use App\Models\Recharge;
use App\Models\TransferLog;
use App\Models\Withdraw;
use App\Services\GamereportService;
use App\Services\TgService;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use SimpleSoftwareIO\QrCode\Facades\QrCode;  
use App\Models\SystemConfig;

class IndexController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $child = User::getChild($user->id);
        $list = User::whereIn('id',$child)->get();
        $start = $data['start'] ?? '';
        $end = $data['end'] ?? '';
        $all_recharge = 0;
        $all_withdraw= 0;
        $all_valid_bet= 0;
        $all_win_loss= 0;
        foreach ($list as $k => $v) {
            $all_recharge += User::rechargeSum($v->id,$start,$end); //总存款
            $all_withdraw += User::withdrawSum($v->id,$start,$end); //总提款
            $all_valid_bet += User::vaildBetSum($v->id,$start,$end); //总有效投注
            $all_win_loss += User::totalfanhui($v->id,$start,$end); //总输赢
        }
        $list = Message::where('user_id',0)->orderBy('id', 'desc')->paginate(6);




        return view('agent.index', compact('user','list','all_recharge','all_withdraw','all_valid_bet','all_win_loss'));
    }

    public function getuserdata(){
        $user = Auth::user();
        $ret = User::getBetDayDta($user->id,6);
        echo json_encode($ret);
    }

    public function notice()
    {
        $list = Message::where('user_id',0)->orderBy('id', 'desc')->paginate(10);
        return view('agent.notice.notice', compact('list'));
    }
    public function message()
    {
        $user = Auth::user();
        $list = Message::where('user_id',$user->id)->orderBy('id', 'desc')->paginate(10);
        return view('agent.notice.notice', compact('list'));
    }
    public function noticeDetail($id)
    {
        $item = Message::find($id);
        return view('agent.notice.notice_detail', compact('item'));
    }

    /**
     * 图表
     *
     * @return void
     */
    public function chart()
    {
        return view('agent.report.chart');
    }

    /**
     * 今日概况
     *
     * @return void
     */
    public function todayData()
    {
        $user = Auth::user();
        // 下级会员数
        $child_member = User::getChildMember($user->id);
        $child_member_count = count($child_member);
        // 下级代理
        $child_agent = User::getChildAgent($user->id);
        $child_agent_count = count($child_agent);
        // 直属会员
        $directly_member_count = User::where('pid', $user->id)->where('isagent', 0)->count();
        // 直属代理数
        $directly_agent_count = User::where('pid', $user->id)->where('isagent', 1)->count();
        // 今日新增会员数
        $add_member_count = User::where('pid', $user->id)->whereDate('created_at', date('Y-m-d'))->count();
        // 今日总存款
        $all_child = User::getChild($user->id);
        $all_recharge = Recharge::whereIn('user_id', $all_child)->whereDate('created_at', date('Y-m-d'))->where('state', 2)->sum('amount');
        // 今日总提款
        $all_withdraw = Withdraw::whereIn('user_id', $all_child)->whereDate('created_at', date('Y-m-d'))->where('state', 2)->sum('amount');
        // 今日投注
        $all_bet = GameRecord::whereIn('user_id', $all_child)->whereDate('created_at', date('Y-m-d'))->sum('bet_amount');
        // 今日有效投注
        $all_valid_bet = GameRecord::whereIn('user_id', $all_child)->whereDate('created_at', date('Y-m-d'))->sum('valid_amount');
        // 今日输赢
        $win_loss =  GameRecord::whereIn('user_id', $all_child)->whereDate('created_at', date('Y-m-d'))->sum('win_loss');
        return view('agent.report.today_data',compact('child_member_count','child_agent_count','directly_member_count','directly_agent_count','add_member_count','all_recharge','all_withdraw','all_bet','all_valid_bet','win_loss'));
    }

    /**
     * 盈亏报表
     *
     * @return void
     */
    public function profit(Request $request)
    {
        $data = $request->all();
        $username = $data['username'] ?? '';

        $user = Auth::user();
        $child = User::getChild($user->id);
        if ($username) {
            $search_user = User::where('username',$username)->first();
            if (!$search_user) {
                return back()->with('opMsg','用户不存在');
            }
            if (!in_array($search_user->id,$child->toArray())) {
                return back()->with('opMsg','用户不在您的下级列表中');
            }
        }
        $list = User::whereIn('id',$child)->paginate(10);
        $start = $data['start'] ?? '';
        $end = $data['end'] ?? '';
        foreach ($list as $k => $v) {
            $rechage_times = User::rechargeTimes($v->id,$start,$end); //充值次数
            $withdraw_times = User::withdrawTimes($v->id,$start,$end); //提现次数
            $all_recharge = User::rechargeSum($v->id,$start,$end); //总存款
            $all_withdraw = User::withdrawSum($v->id,$start,$end); //总提款
            $all_valid_bet = User::vaildBetSum($v->id,$start,$end); //总有效投注
            $all_win_loss = User::winLoss($v->id,$start,$end); //总输赢
            $list[$k]->rechage_times = $rechage_times;
            $list[$k]->withdraw_times = $withdraw_times;
            $list[$k]->all_recharge = $all_recharge;
            $list[$k]->all_withdraw = $all_withdraw;
            $list[$k]->all_valid_bet = $all_valid_bet;
            $list[$k]->all_win_loss = $all_win_loss;
        }
        return view('agent.report.profit',compact('list','start','end','username'));
    }


    /**
     * 佣金报表
     *
     * @return void
     */
    public function commission(Request $request)
    {
        $data = $request->all();
        $username = $data['username'] ?? '';
        $user = Auth::user();
        $child = User::getChild($user->id);
        $lists = User::whereIn('id',$child)->get();
        $start = $data['start'] ?? '';
        $end = $data['end'] ?? '';
        $rechage_times =0;
        $withdraw_times =0;
        $all_recharge =0;
        $all_withdraw =0;
        $all_valid_bet =0;
        $all_win_loss =0;
        $usersum =0;
        $agentsum =0;
        $all_fanshui = 0;
        $all_redpacket = 0;
        $all_valid_betsum = 0;
        $yongjinsum =0;
        $waityongjinsum = 0;
        foreach ($lists as $k => $v) {
            $rechage_times += User::rechargeTimes($v->id,$start,$end); //充值次数
            $withdraw_times += User::withdrawTimes($v->id,$start,$end); //提现次数
            $all_recharge += User::rechargeSum($v->id,$start,$end); //总存款
            $all_withdraw += User::withdrawSum($v->id,$start,$end); //总提款
            $all_valid_bet += User::vaildBetSum($v->id,$start,$end); //总有效投注
            $all_valid_betsum += User::vaildBetCount($v->id,$start,$end); //总有效投注


            $all_win_loss += User::winLoss($v->id,$start,$end); //总输赢
            $all_fanshui += User::totalfanhui($v->id,$start,$end); //总输赢
            $all_redpacket += User::redpacketSum($v->id,$start,$end); //总输赢

            $usersum += User::UserSum($v->id,$start,$end); //下级会员

            $agentsum += User::AgentSum($v->id,$start,$end); //下级代理

            $yongjinsum += User::Agentyongjin($v->id,$start,$end); //已结算佣金统计

            $waityongjinsum +=User::Agentyongjinwait($v->id,$start,$end); //未结算佣金统计

        }



        $list = array();
        $list[0]['username'] = $user->username;
        $list[0]['realname'] = $user->realname;
        $list[0]['isagent'] = $user->isagent;
        $list[0]['rechage_times'] = $rechage_times;
        $list[0]['withdraw_times'] = $withdraw_times;
        $list[0]['all_recharge'] = $all_recharge;
        $list[0]['all_withdraw'] = $all_withdraw;
        $list[0]['all_valid_bet'] = $all_valid_bet;
        $list[0]['all_win_loss'] = $all_win_loss;
        $list[0]['all_fanshui'] = $all_fanshui;
        $list[0]['all_redpacket'] = $all_redpacket;
        $list[0]['all_valid_betsum'] = $all_valid_betsum;

        // $list[0]['usersum'] = $usersum;
        // $list[0]['agentsum'] = $agentsum;
        // $list[0]['yongjinsum'] = $yongjinsum;
        // $list[0]['waityongjinsum'] = $waityongjinsum;
        // $list[0]['rechage_times'] = $rechage_times + User::rechargeTimes($user->id,$start,$end);
        // $list[0]['withdraw_times'] = $withdraw_times+ User::withdrawTimes($user->id,$start,$end);
        // $list[0]['all_recharge'] = $all_recharge+ User::rechargeSum($user->id,$start,$end);
        // $list[0]['all_withdraw'] = $all_withdraw+ User::withdrawSum($user->id,$start,$end);
        // $list[0]['all_valid_bet'] = $all_valid_bet+ User::vaildBetSum($user->id,$start,$end);
        // $list[0]['all_win_loss'] = $all_win_loss+ User::winLoss($user->id,$start,$end);
        // $list[0]['all_fanshui'] = $all_fanshui+ User::totalfanhui($user->id,$start,$end);
        // $list[0]['all_redpacket'] = $all_redpacket+ User::redpacketSum($user->id,$start,$end);
        // $list[0]['all_valid_betsum'] = $all_valid_betsum+ User::vaildBetCount($user->id,$start,$end);
        $list[0]['usersum'] = $usersum + User::UserSum($user->id);
        $list[0]['agentsum'] = $agentsum + User::AgentSum($user->id,$start,$end);
        $list[0]['yongjinsum'] = $yongjinsum + User::Agentyongjin($user->id,$start,$end);
        $list[0]['waityongjinsum'] = $this->getwaityongjinsum($user->id);
        $list = self::arrayToObject($list);

        return view('agent.report.commission',compact('list','start','end','username'));
    }
    
    protected function getwaityongjinsum($user_id)
    {
        $id = $user_id;
        $money = 0;
        $settlementday = intval(SystemConfig::getValue('settlement'));
        $diffday = strtotime(date('Y-m-d'))-$settlementday*60*60*24;
        $val = User::where('isagent','=',1)->where('id','=',$id)->first();
        if ($val){
            $transfermoney = TransferLog::where("state",2)->where('user_id',$val->id)->where('transfer_type',20)->sum('money');
            $money = $transfermoney;

            // $child = User::getChild($val->id);
            // $list = User::whereIn('id',$child)->get();
            // $totalfanhui = 0;
            // $totalredpacketSum =0;
            // $totalRechargeredpacketSum =0;
            // foreach ($list as $k => $v) {
            //     //反水
            //     $totalfanhui += User::totalfanhui($v->id, date('Y-m-d', $diffday) . ' 00:00:00', date('Y-m-d', time()) . ' 23:59:59');
            //     //紅包
            //     $totalredpacketSum +=   User::redpacketSum($v->id, date('Y-m-d', $diffday) . ' 00:00:00', date('Y-m-d', time()) . ' 23:59:59');
            //     // 充值送红包
            //     $totalRechargeredpacketSum +=   User::RechargeredpacketSum($v->id, date('Y-m-d', $diffday) . ' 00:00:00', date('Y-m-d', time()) . ' 23:59:59');
            // }
            // $user = User::where('id',$val->id)->first();
            // $money =  $transfermoney -  $totalfanhui - $totalredpacketSum - $totalRechargeredpacketSum;
        }
        return $money > 0 ? $money : 0;
    }
    
    
    function arrayToObject($e){
        if( gettype($e)!='array' ) return;
        foreach($e as $k=>$v){
            if( gettype($v)=='array' || getType($v)=='object' )
                $e[$k]=(object)self::arrayToObject($v);
        }
        return (object)$e;
    }

    /**
     * 佣金报表
     *
     * @return void
     */
    public function subordinate(Request $request)
    {
        $data = $request->all();
        $username = $data['username'] ?? '';

        $user = Auth::user();
        $child = User::getChild($user->id);
        if ($username) {
            $search_user = User::where('username',$username)->first();
            if (!$search_user) {
                return back()->with('opMsg','用户不存在');
            }
            if (!in_array($search_user->id,$child->toArray())) {
                return back()->with('opMsg','用户不在您的下级列表中');
            }
        }
        $list = User::whereIn('id',$child)->where('isagent',1)->paginate(10);
        $start = $data['start'] ?? '';
        $end = $data['end'] ?? '';
        foreach ($list as $k => $v) {

            $res = self::agentcommission($v->id,$start,$end);

            $list[$k]->rechage_times = $res['rechage_times'];
            $list[$k]->withdraw_times = $res['withdraw_times'];
            $list[$k]->all_recharge = $res['all_recharge'];
            $list[$k]->all_withdraw = $res['all_withdraw'];
            $list[$k]->all_valid_bet = $res['all_valid_bet'];
            $list[$k]->all_win_loss = $res['all_win_loss'];
            $list[$k]->all_fanshui = $res['all_fanshui'];
            $list[$k]->all_redpacket = $res['all_redpacket'];


            $list[$k]->usersum = User::UserSum($v->id,$start,$end);;
            $list[$k]->agentsum = User::AgentSum($v->id,$start,$end);
            // $list[$k]->yongjinsum = $res['yongjinsum'];
            $list[$k]->yongjinsum = $this->getwaityongjinsum($v->id);
        }
        return view('agent.report.subordinate',compact('list','start','end','username'));
    }



    /**
     * 佣金报表
     *
     * @return void
     */
    public function agentcommission($user_id,$start,$end)
    {

        $child = User::getChild($user_id);
        $lists = User::whereIn('id',$child)->get();
        $start = $data['start'] ?? '';
        $end = $data['end'] ?? '';
        $rechage_times =0;
        $withdraw_times =0;
        $all_recharge =0;
        $all_withdraw =0;
        $all_valid_bet =0;
        $all_win_loss =0;
        $usersum =0;
        $agentsum =0;
        $all_fanshui=0;
        $all_redpacket = 0;
        foreach ($lists as $k => $v) {
            $rechage_times += User::rechargeTimes($v->id,$start,$end); //充值次数
            $withdraw_times += User::withdrawTimes($v->id,$start,$end); //提现次数
            $all_recharge += User::rechargeSum($v->id,$start,$end); //总存款
            $all_withdraw += User::withdrawSum($v->id,$start,$end); //总提款
            $all_valid_bet += User::vaildBetSum($v->id,$start,$end); //总有效投注
            $all_win_loss += User::winLoss($v->id,$start,$end); //总输赢

            $all_fanshui += User::totalfanhui($v->id,$start,$end); //总输赢
            $all_redpacket += User::redpacketSum($v->id,$start,$end); //总输赢
            //
            $usersum += User::UserSum($v->id,$start,$end); //下级会员

            $agentsum += User::AgentSum($v->id,$start,$end); //下级代理


        }


        $yongjinsum = User::Agentyongjin($user_id,$start,$end); //佣金统计
        $list = array();
        $list['rechage_times'] = $rechage_times;
        $list['withdraw_times'] = $withdraw_times;
        $list['all_recharge'] = $all_recharge;
        $list['all_withdraw'] = $all_withdraw;
        $list['all_valid_bet'] = $all_valid_bet;
        $list['all_win_loss'] = $all_win_loss;
        $list['all_fanshui'] = $all_fanshui;
        $list['all_redpacket'] = $all_redpacket;
        $list['yongjinsum'] = $yongjinsum;
        $list['usersum'] = $yongjinsum;
        $list['agentsum'] = $yongjinsum;


        return $list;
    }

    /**
     * 添加下级会员
     */
    public function addMember(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();
            $user = User::where('username',$data['username'])->first();
            $puser = Auth::user();
            if ($user) return back()->with('opMsg','用户名已存在');
            $is_agent = 1;
            $pp_user = User::where('id',$puser->pid)->first();
            if ($pp_user && $pp_user->allowagent == 0) $is_agent = 0;
            $arr = [
                'username' => $data['username'],
                'pid' => $puser->id,
                'password' => Hash::make($data['password']),
                'realname' => $data['realname'],
                'paypwd' => Hash::make('123456'),
                'vip' => 1,
                'isagent' => $is_agent
            ];


            User::create($arr);

/*            if($puser->id){
                $puser = User::where('id',$puser->pid)->first();
                $Gamereport = new GamereportService();
                $data['uid'] = $puser->id;
                $data['pid'] = $puser->pid;
                $data['isagent'] = $puser->isagent;
                $data['recnum'] =  1;
                $Gamereport->add($data);
            }*/

             return redirect('/memberlist')->with('opMsg', '添加成功');
        }
        return view('agent.agent.add_member');
    }

    /**
     * 会员列表
     *
     * @param Request $request
     * @return void
     */
    public function memberList(Request $request)
    {
        $user = Auth::user();
        $username = $request->input('username') ?? '';
        $child = User::getChild($user->id);
        $list = User::whereIn('id',$child)->where('status',1)
            ->when($username,function ($query) use ($username){
                return $query->where('username',$username);
            })->paginate(10);
        foreach ($list as $k =>$v) {
            $parent = User::find($v->pid);
            $list[$k]->parent = $parent ? $parent->username : '';
            $list[$k]->is_direct = $v['pid'] == $user->id ? 1 : 0;
        }
        return view('agent.agent.member',compact('list','user'));
    }

    /**
     * 下注记录
     *
     * @param Request $request
     * @return void
     */
    public function betLog(Request $request)
    {
        $data = $request->all();
        $user = Auth::user();
        $username = $request->input('username') ?? '';
        $child = User::getChild($user->id);
        $start = $data['start'] ?? '';
        $end = $data['end'] ?? '';
        $list = GameRecord::whereIn('user_id',$child)
            ->when($username,function ($query) use ($username){
                return $query->where('username',$username);
            })->when($start, function ($query) use ($start) {
                $start = date('Y-m-d 00:00:00', strtotime($start));
                return $query->where('created_at', '>', $start);
            })->when($end, function ($query) use ($end) {
                $end = date('Y-m-d 23:59:59', strtotime($end));
                return $query->where('created_at', '<=', $end);
            })->orderBy('id','desc')->paginate(10);
        return view('agent.agent.bet_log',compact('list'));
    }

    /**
     * 充值记录
     *
     * @param Request $request
     * @return void
     */
    public function rechargeLog(Request $request)
    {
        $data = $request->all();
        $user = Auth::user();
        $username = $request->input('username') ?? '';
        $user_id = User::where('username',$username)->value('id') ?? '';
        $child = User::getChild($user->id);
        $start = $data['start'] ?? '';
        $end = $data['end'] ?? '';
        $list = Recharge::whereIn('user_id',$child)
            ->when($user_id,function ($query) use ($user_id){
                return $query->where('user_id',$user_id);
            })->when($start, function ($query) use ($start) {
                $start = date('Y-m-d 00:00:00', strtotime($start));
                return $query->where('created_at', '>', $start);
            })->when($end, function ($query) use ($end) {
                $end = date('Y-m-d 23:59:59', strtotime($end));
                return $query->where('created_at', '<=', $end);
            })->orderBy('id','desc')->paginate(10);
        return view('agent.agent.recharge_log',compact('list'));
    }

    /**
     * 提现记录
     *
     * @param Request $request
     * @return void
     */
    public function withdrawLog(Request $request)
    {
        $data = $request->all();
        $user = Auth::user();
        $username = $request->input('username') ?? '';
        $user_id = User::where('username',$username)->value('id') ?? '';
        $child = User::getChild($user->id);
        $start = $data['start'] ?? '';
        $end = $data['end'] ?? '';
        $list = Withdraw::whereIn('user_id',$child)
            ->when($user_id,function ($query) use ($user_id){
                return $query->where('user_id',$user_id);
            })->when($start, function ($query) use ($start) {
                $start = date('Y-m-d 00:00:00', strtotime($start));
                return $query->where('created_at', '>', $start);
            })->when($end, function ($query) use ($end) {
                $end = date('Y-m-d 23:59:59', strtotime($end));
                return $query->where('created_at', '<=', $end);
            })->orderBy('id','desc')->paginate(10);
        return view('agent.agent.recharge_log',compact('list'));
    }

    /**
     * 转账记录
     *
     * @param Request $request
     * @return void
     */
    public function transferLog(Request $request)
    {
        $data = $request->all();
        $user = Auth::user();
        $username = $request->input('username') ?? '';
        $user_id = User::where('username',$username)->value('id') ?? '';
        $child = User::getChild($user->id);
        $start = $data['start'] ?? '';
        $end = $data['end'] ?? '';
        $list = TransferLog::whereIn('user_id',$child)->whereIn('transfer_type',[0,1])
            ->when($user_id,function ($query) use ($user_id){
                return $query->where('user_id',$user_id);
            })->when($start, function ($query) use ($start) {
                $start = date('Y-m-d 00:00:00', strtotime($start));
                return $query->where('created_at', '>', $start);
            })->when($end, function ($query) use ($end) {
                $end = date('Y-m-d 23:59:59', strtotime($end));
                return $query->where('created_at', '<=', $end);
            })->orderBy('id','desc')->paginate(10);
        return view('agent.agent.transfer_log',compact('list'));
    }


    /**
     * 提现记录
     *
     * @param Request $request
     * @return void
     */
    public function releasewaterLog(Request $request)
    {
        $data = $request->all();
        $user = Auth::user();
        $username = $request->input('username') ?? '';
        $user_id = User::where('username',$username)->value('id') ?? '';
        $child = User::getChild($user->id);
        $start = $data['start'] ?? '';
        $end = $data['end'] ?? '';
        $list = TransferLog::whereIn('user_id',$child)->where('transfer_type',6)
            ->when($user_id,function ($query) use ($user_id){
                return $query->where('user_id',$user_id);
            })->when($start, function ($query) use ($start) {
                $start = date('Y-m-d 00:00:00', strtotime($start));
                return $query->where('created_at', '>', $start);
            })->when($end, function ($query) use ($end) {
                $end = date('Y-m-d 23:59:59', strtotime($end));
                return $query->where('created_at', '<=', $end);
            })->orderBy('id','desc')->paginate(10);
        return view('agent.agent.releasewater_log',compact('list'));
    }
    
    public function generateQrcode()
    {
        $user = Auth::user();
        $str = env('APP_URL').'/register?id='.$user->id;
        // $folder = '/uploads/agent/qrcode';
        // if (!is_dir($folder)) mkdir($folder,0777,true);
        // $filename = $folder.'/'.$user->id.'.png';
        $filename = public_path('uploads/agent/qrcode/'.$user->id.'.png');
        if (!file_exists($filename)) {
            QrCode::encoding('UTF-8')->format('png')->generate($str,$filename); 
        }
        return response()->download($filename,uniqid().'.png');
        
    }
    
    //下级充值
    public function recharge(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();
            if (!isset($data['amount']) || !is_numeric($data['amount']) || $data['amount'] < 0) return back()->with('opMsg','请输入正确的金额');
            $user = Auth::user();
            if ($data['amount'] > $user->balance) return back()->with('opMsg','余额不足');
            $user->balance -= $data['amount'];
            $user->save();
            $child = User::find($data['user_id']);
            $child->balance += $data['amount'];
            $child->save();
            $arr['order_no'] = $child->id.time().rand(10000,90000);
            $arr['out_trade_no'] = $child->id.time().rand(10000,90000);
            $arr['user_id'] = $child->id;
            $arr['amount'] = $data['amount'];
            $arr['cash_fee'] = 0;
            $arr['real_money'] = $data['amount'];
            $arr['pay_way'] = 11;
            $arr['info'] = '代理充值';
            $arr['state'] = 2;
            Recharge::create($arr);
            return redirect('/memberlist')->with('opMsg', '充值成功');
        }
        $user_id = $request->input('user_id');
        return view('agent.agent.recharge',compact('user_id'));
    }
}
