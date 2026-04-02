<span class="dropdown" style="display:inline-block">
    <a id="" class="dropdown-toggle btn btn-sm btn-white waves-effect" data-toggle="dropdown" href="javascript:void(0)">
        <stub>{{$value}}</stub><span class="caret"></span>
    </a>
    <ul class="dropdown-menu" style="left: 0px; right: inherit;">
        <li class="dropdown-item"><a href="/{{ env('ADMIN_ROUTE_PREFIX') }}/recharge?user_data%5Busername%5D={{$value}}">充值记录</a></li>
        <li class="dropdown-item"><a href="/{{ env('ADMIN_ROUTE_PREFIX') }}/withdraws?user_data%5Busername%5D={{$value}}">提现记录</a></li>
        <li class="dropdown-item"><a href="/{{ env('ADMIN_ROUTE_PREFIX') }}/transfer-logs?user_data%5Busername%5D={{$value}}">额度转换记录</a></li>
        <li class="dropdown-item"><a href="/{{ env('ADMIN_ROUTE_PREFIX') }}/user-operate-logs?user_data%5Busername%5D={{$value}}">登录日志</a></li>
        <li class="dropdown-item"><a href="/{{ env('ADMIN_ROUTE_PREFIX') }}/usercard?user_data%5Busername%5D={{$value}}">银行卡管理</a></li>
    </ul>
</span>