<?php

namespace App\Admin\Forms;

use App\Models\GameRecord;
use App\Models\Recharge;
use Dcat\Admin\Widgets\Form;
use App\Models\SystemConfig;
use App\Models\Withdraw;
use App\User;
use Illuminate\Http\Request;

class SiteSetting extends Form
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
        
        foreach ($input as $k => $v) {
            $arr = ['key' => $k,'value' => $v ?? ''];
            SystemConfig::updateOrCreate(['key' => $k],$arr);
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
        $this->tab('Website Configuration', function () {
            $this->text('site_name','Website Name');
            $this->image('site_logo','Website Logo')->uniqueName();
            $this->text('site_title','Website Title');
            $this->text('site_keyword','Website Keywords');
            $this->text('kf_url','Customer Service URL');
            $this->text('safe_domain','Allowed Domains')->help("Separate multiple addresses with commas; leave blank for no restriction. E.g.: http://pc-domain.com,http://mobile-domain.com,http://tggood.com");
            $this->radio('redpacket','Red Packet Switch')->options([1 => 'Active',0 => 'Disabled'])->default(1);
            $this->radio('fanshui','Cashback Switch')->options([1 => 'Active',0 => 'Disabled'])->default(1);
            $this->radio('site_state','Website Status')->options([1 => 'Active',0 => 'Maintenance'])->default(1);
            $this->text('repair_tips','Maintenance Message');
            $this->radio('isclose','Homepage Popup')->options([1 => 'Active',0 => 'Disabled'])->default(1);
            $this->editor('webcontent','Popup Content');
        });

        $this->tab('APP Configuration', function () {
            //$this->text('android_version','Android Version');
            //$this->text('android_download_url','Android Download URL');
            //$this->image('android_download_qrcode','Android Download QR Code')->uniqueName();
            // $this->text('ios_version','iOS Version');
            $this->text('ios_download_url','Distribution Download URL');
            $this->image('ios_download_qrcode','Distribution Download QR Code')->uniqueName();
        });
        
        $this->tab('API Settings', function() {
          //  $this->text('game_api','API Endpoint URL');
            $this->text('merchant_account','ApiToken');
            $this->text('api_secret','MD5 Secret');
           // Button links (replace with your desired URLs)
    $url1 = 'https://merchant.fsgameapi.com/Register/Index?p=BD9A7DA86CE706A662FC6A84ACDCF9238709BCD8F6DFFB20F69FE08A73356D4B2E0F96D4048E5381935EB883032E7FA337ED7F17DADDAB710CA502F9B29610C9E607A1D45AD9BAE3522A3C87A1B30CA7';
    $url2 = 'https://bet.fsgameapi.com';
    $url3 = 'https://t.me/fsapibot';
    $url4 = 'https://t.me/fstongzhi';

    // Button HTML
    $buttons = <<<HTML
<div style="margin-top:20px;">

    <a href="{$url1}" target="_blank" class="btn btn-primary" style="margin-right:15px;">
        Register API Merchant
    </a>

    <a href="{$url2}" target="_blank" class="btn btn-success" style="margin-right:15px;">
        Merchant Dashboard
    </a>

    <a href="{$url3}" target="_blank" class="btn btn-warning" style="margin-right:15px;">
        API Bot
    </a>

    <a href="{$url4}" target="_blank" class="btn btn-danger">
        API Maintenance Notifications
    </a>

</div>
HTML;

    // Render buttons
    $this->html($buttons);
});

        $this->tab('Payment Settings', function() {
            $this->text('onlinepay_title','Online Payment Title');
            $this->text('onlinepay_des','Online Payment Description');
            $this->text('companypay_title','Company Deposit Title');
            $this->text('companypay_des','Company Deposit Description');

        });
        
        $this->tab('Deposit Settings',function() {
            $this->number('min_recharge_money','Minimum Deposit Amount');
            $this->text('recharge_fee','Deposit Bonus Rate (%)');
            $this->number('max_recharge_money','Maximum Deposit Amount');
            $this->decimal('usdt_rate','USDT Exchange Rate');
            $this->decimal('min_price','Bank Card Minimum Deposit')->required();
            $this->decimal('max_price','Bank Card Maximum Deposit')->required();
        });

        $this->tab('Withdrawal Settings',function() {
            $this->time('withdraw_begin_time','Withdrawal Start Time');
            $this->time('withdraw_end_time','Withdrawal End Time');
            $this->number('daily_withdraw_times','Daily Withdrawal Limit');
            $this->number('min_withdraw_money','Minimum Withdrawal Amount');
            $this->number('max_withdraw_money','Maximum Withdrawal Amount');
            $this->text('withdraw_fee','Wagering Multiplier');
            $this->number('min_fanshui_money','Minimum Cashback Amount');
            $this->decimal('withdraw_cash_fee','USDT-TRC20 Fee');
            $this->decimal('withdraw_fee_usdt_erc','USDT-ERC20 Fee');
            $this->decimal('withdraw_usdt_rate','Withdrawal USDT Rate');
        });

        
        $this->tab('Agent Settings',function() {
            $this->select('settlement','Agent Settlement Cycle')->options([1 => 'T+1',2 => 'T+2',3 => 'T+3',4 => 'T+4',5 => 'T+5',6 => 'T+6',7 => 'T+7',10 => 'T+10',15 => 'T+15',20 => 'T+20',30 => 'T+30'])->default(4);
            $this->radio('settlementtypes','Agent Settlement Method')->options([1 => 'Settle by Win/Loss',0 => 'Settle by Wagering Amount'])->default(1);
            $this->number('settlementlevel','Agent Commission Levels');
        });
        
        $this->tab('Notification Settings', function() {
            $this->select('notice_set','Notification Method')->options([1 => 'Voice + Popup',2 => 'Voice Only',3 => 'Popup Only'])->default(1);
            $this->file('recharge_apply_audio','Deposit Notification Audio');
            $this->file('withdraw_apply_audio','Withdrawal Notification Audio');
            $this->file('activity_apply_audio','Activity Application Notification Audio');
            $this->file('agent_apply_audio','Agent Application Notification Audio');
            // $this->text('syslogday','Loan Application Notification Audio');
            // $this->text('syslogday','Finance Manager Application Notification Audio');

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
            'safe_domain'  => SystemConfig::getValue('safe_domain'),
            'site_name'  => SystemConfig::getValue('site_name'),
            'site_logo' => SystemConfig::getValue('site_logo'),
            'site_title' => SystemConfig::getValue('site_title'),
            'site_keyword' => SystemConfig::getValue('site_keyword'),
            'kf_url' => SystemConfig::getValue('kf_url'),
            'site_state' => SystemConfig::getValue('site_state'),
            'repair_tips' => SystemConfig::getValue('repair_tips'),
            'android_version' => SystemConfig::getValue('android_version'),
            'android_download_url' => SystemConfig::getValue('android_download_url'),
            'android_download_qrcode' => SystemConfig::getValue('android_download_qrcode'),
            'ios_version' => SystemConfig::getValue('ios_version'),
            'ios_download_url' => SystemConfig::getValue('ios_download_url'),
            'ios_download_qrcode' => SystemConfig::getValue('ios_download_qrcode'),
            'game_api' => SystemConfig::getValue('game_api'),
            'merchant_account' => SystemConfig::getValue('merchant_account'),
            'api_secret' => SystemConfig::getValue('api_secret'),
            'withdraw_begin_time' => SystemConfig::getValue('withdraw_begin_time'),
            'withdraw_end_time' => SystemConfig::getValue('withdraw_end_time'),
            'daily_withdraw_times' => SystemConfig::getValue('daily_withdraw_times'),
            'min_withdraw_money' => SystemConfig::getValue('min_withdraw_money'),
            'max_withdraw_money' => SystemConfig::getValue('max_withdraw_money'),
            'min_recharge_money' => SystemConfig::getValue('min_recharge_money'),
            'max_recharge_money' => SystemConfig::getValue('max_recharge_money'),
            'isclose' => SystemConfig::getValue('isclose'),
            'applyday' => SystemConfig::getValue('applyday'),
            'gameorder' => SystemConfig::getValue('gameorder'),
            'syslogday' => SystemConfig::getValue('syslogday'),
            'accountday' => SystemConfig::getValue('accountday'),
            'agentday' => SystemConfig::getValue('agentday'),
            'webcontent' => SystemConfig::getValue('webcontent'),
            'fanshui' => SystemConfig::getValue('fanshui'),
            'redpacket' => SystemConfig::getValue('redpacket'),
            'withdraw_fee' => SystemConfig::getValue('withdraw_fee'),
            'recharge_fee' => SystemConfig::getValue('recharge_fee'),
            'min_fanshui_money' => SystemConfig::getValue('min_fanshui_money'),
            'settlement' => SystemConfig::getValue('settlement'),
            'settlementlevel'=> SystemConfig::getValue('settlementlevel'),
            'notice_set' => SystemConfig::getValue('notice_set'),
            'recharge_apply_audio' => SystemConfig::getValue('recharge_apply_audio'),
            'withdraw_apply_audio' => SystemConfig::getValue('withdraw_apply_audio'),
            'activity_apply_audio' => SystemConfig::getValue('activity_apply_audio'),
            'agent_apply_audio' => SystemConfig::getValue('agent_apply_audio'),
            'settlementtypes' =>SystemConfig::getValue('settlementtypes'),
            'usdt_rate' => SystemConfig::getValue('usdt_rate'),
            'withdraw_cash_fee' => SystemConfig::getValue('withdraw_cash_fee'),
            'withdraw_usdt_rate' => SystemConfig::getValue('withdraw_usdt_rate'),
            'withdraw_fee_usdt_erc' => SystemConfig::getValue('withdraw_fee_usdt_erc'),
            'min_price' => SystemConfig::getValue('min_price'),
            'max_price' => SystemConfig::getValue('max_price'),
        ];
    }
}
