<?php
//decode by http://www.yunlu99.com/
namespace App\Services;
use Illuminate\Support\Facades\Cookie;
use App\Models\SystemConfig;

class TgService
{
    protected $api_account;
    protected $sign_key;
    protected $api_url;
    protected $showlang;

    public function __construct()
    {
        $this->api_url = SystemConfig::getValue('game_api');
        $this->api_account = SystemConfig::getValue('merchant_account');
        $this->sign_key = SystemConfig::getValue('api_secret');
        $this->showlang = empty(Cookie::get("userlang"))? 'zh' : Cookie::get("userlang");
                  
    }

    /**
     * [generateCode 生成验签code]
     * @param        Array                    $data [提交数据]
     * @return      [string]                         [加密验签code]
     */
    private function generateCode(Array $data)
    {
        ksort($data);
        $str = '';
        foreach($data as $v){
            $str .= $v;
        }
        $str .= $this->sign_key;
        return strtoupper(md5($str));
    }

    private function sendRequest($url,$post_data=array()){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 600);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        $contents = curl_exec($ch);
        curl_close($ch);
       

               
        return json_decode ($contents, TRUE);
    }

    /**
     * [register 注册会员]
     * @param        [string]                   $username  [会员用户名]
     * @param        string                   $plat_type [平台类型]
     * @return      [Array]                              []
     */
    public function register($username,$plat_type="bg")
    {
        $data = [
            'username' => $username,
            'api_account' => $this->api_account,
            'plat_type' => $plat_type,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/register",$data);
        return $res;
    }

    /**
     * [login 登录获取游戏地址]
     * @DateTime  2020-09-16T09:54:01+0800
     * @param        [string]                   $username      [会员用户名]
     * @param        string                   $plat_type     [平台类型]
     * @param        string                   $game_type     [游戏类型]
     * @param        integer                  $is_mobile_url [是否手机访问]
     * @param        string                   $game_code     [游戏代码]
     * @return      [Array]
     */
    public function login($username,$plat_type="ag",$game_type="1",$is_mobile_url=0,$game_code="",$lang='zh-cn')
    {
        $data = [
            'username' => $username,
            'api_account' => $this->api_account,
            'plat_type' => $plat_type,
            'game_type' => $game_type,
            'is_mobile' => $is_mobile_url,
            'game_code' => $game_code,
            'lang' => empty($this->showlang) ? $lang : $this->showlang,
        ];
        
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/login",$data);
              \Illuminate\Support\Facades\Log::info("Iglogin游戏记录参数");
               \Illuminate\Support\Facades\Log::info($data);      
        return $res;
    }

    /**
     * [userBalance 用户某平台余额]
     * @param        [string]                   $username  [用户名]
     * @param        string                   $plat_type [平台类型]
     * @return      [array]
     */
    public function userBalance($username,$plat_type="ag")
    {
        $data = [
            'username' => $username,
            'api_account' => $this->api_account,
            'plat_type' => $plat_type,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/user/balance",$data);

        return $res;
    }

    /**
     * [allBalance 查询会员游戏全部平台余额]
     * @param        [string]                   $username [用户名]
     * @return      [Array]
     */
    public function allBalance($username)
    {
        $data = [
            'username' => $username,
            'api_account' => $this->api_account,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/user/all-balance",$data);
        return $res;
    }

    /**
     * [allRecords 所有游戏记录]
     * @DateTime  2020-09-16T11:12:24+0800
     * @param        string                   $username  [用户名]
     * @param        string                   $plat_type [平台类型]
     * @param        string                   $game_type [游戏类型]
     * @param        integer                  $page      [页码]
     * @param        integer                  $limit     [每页数量]
     * @return      [Array]
     */
    public function allRecords($username="",$plat_type="",$game_type="",$page=1,$limit=100)
    {
        $data = [
            'username' => $username,
            'plat_type' => $plat_type,
            'game_type' => $game_type,
            'page' => $page,
            'limit' => $limit,
            'api_account' => $this->api_account,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/record-all",$data);
        return $res;
    }

    public function gameRecords($username="",$plat_type="",$game_type="",$page=1,$start,$end)
    {
        $data = [
            'username' => $username,
            'platform_type' => $plat_type,
            'game_type' => $game_type,
            'page' => $page,
            'start' => $start,
            'end' => $end,
            'api_account' => $this->api_account,
        ];
        //echo $this->api_url;
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/gamelistRecord",$data);
        return $res;
    }


    /**
     * [trans 更新免转钱包额度]
     * @param        [string]                   $username           [用户名]
     * @param        [decimal]                   $money              [金额]
     * @param        [string]                   $client_transfer_id [订单id]
     * @return      [Array]
     */
    public function trans($username,$money,$client_transfer_id,$plat_name='ag',$game_type='200')
    {
        $data = [
            'username' => $username,
            'money' => $money,
            'plat_name' => $plat_name,
            'game_type' => $game_type,
            'client_transfer_id' => $client_transfer_id,
            'api_account' => $this->api_account,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/userswallet/trans",$data);
        return $res;
    }

    /**
     * [walletBalance 免转钱包余额]
     * @DateTime  2020-09-16T13:57:09+0800
     * @param        [string]                   $username [用户名]
     * @return      [Array]
     */
    public function walletBalance($username)
    {
        $data = [
            'username' => $username,
            'api_account' => $this->api_account,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/wallet/balance",$data);
        return $res;
    }

    /**
     * 一键转出所有额度
     *
     * @param [type] $username
     * @return void
     */
    public function transAll($username)
    {
        $data = [
            'username' => $username,
            'api_account' => $this->api_account,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/user/trans-all",$data);
        return $res;
    }

    /**
     * 商户额度查询
     *
     * @return void
     */
    public function merchantCredit()
    {
        $data = [
            'api_account' => $this->api_account,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/user/all-credit",$data);
        return $res;
    }

    /**
     * 游戏查询
     *
     * @return void
     */
    public function gameslist($plat_type)
    {
        $data = [
            'gamecode' => $plat_type,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/gamelist",$data);
        return $res;
    }
    /**
     * 游戏查询
     *
     * @return void
     */
    public function gamesalllist()
    {
        $data = [];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/allgamelist",$data);
        return $res;
    }
    /**
     * 游戏查询
     *
     * @return void
     */
    public function gametypelist($plat_type)
    {
        $data = [
            'gametype' => $plat_type,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/gametypelist",$data);
        return $res;
    }
    /**
     * 一键提取
     *
     * @return void
     */
    public function recoverallbalance($plat_type)
    {
        $data = [
            'username' => $plat_type,
            'api_account' => $this->api_account,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/goapi/alluserblance",$data);
        return $res;
    }
    
    /**
     * 刷新用户余额
     *
     * @return void
     */
    
    public function allusersbalance($plat_type)
    {
        $data = [
            'username' => $plat_type,
            'api_account' => $this->api_account,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/goapi/userblance",$data);
        return $res;
    }
    
    /**
     * 更新用户模式
     *
     * @return void
     */
    public function updateusertype($usernamee,$transferstatus)
    {
        $data = [
            'username' => $usernamee,
            'type' => ($transferstatus==0) ? 2 : 1,
            'api_account' => $this->api_account,
        ];
        $data['code'] = $this->generateCode($data);
        $res = $this->sendRequest($this->api_url."/api/user/updateusertype",$data);
        return $res;
    }  
    
    /**
     * 获取按照大类显示游戏
     *
     * @return void
     */
    public function getallbetgamelist()
    {
        $data = [
            
        ];
        $res = $this->sendRequest($this->api_url."/api/getgamelistbet",$data);
        
        return $res['data'];
    }      
    
    public function getallmoneygamelist()
    {
        $data = [
            
        ];
        $res = $this->sendRequest($this->api_url."/api/getallmoneygamename",$data);
        
        return $res['data'];
    }   
    
    
    /**
     * 获取所有游戏名称
     *
     * @return void
     */
    public function getallgamename()
    {
        $data = [
            
        ];
        $res = $this->sendRequest($this->api_url."/api/getallgamename",$data);
        
        return $res['data'];
    }    
        /**
     * 获取游戏代码
     *
     * @return void
     */
    public function engamelist()
    {
        $data = [
            
        ];
        $res = $this->sendRequest($this->api_url."/api/engamelist",$data);
        
        return $res['data'];
    }    
    
    /**
     * 获取游戏记录名称
     *
     */
    public function getgamerecordallgamename()
    {
        $data = [];
        $res = $this->sendRequest($this->api_url."/api/getgamerecordallgamename",$data);
        
        return $res['data'] ?? [];
    }    
        
    /**
     * 获取返水游戏列表
     *
     */
    public function getfanshuigamelistname()
    {
        $data = [];
        $res = $this->sendRequest($this->api_url."/api/getfanshuigamelist",$data);
        
        return $res ?? [];
    }         
   /**
     * 转账记录游戏列表
     *
     */
    public function getallmoneygame()
    {
        $data = [];
        $res = $this->sendRequest($this->api_url."/api/getallmoneygame",$data);
        
        return $res['data'] ?? [];
    } 
    
    
}