<ul class="nav navbar-nav">
    <li class="dropdown dropdown-notification nav-item">
        <a class="nav-link nav-link-label" href="#" data-toggle="dropdown" aria-expanded="true"><i class="ficon feather icon-bell"></i></a>
        <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right alert-item">
            <li class="dropdown-menu-header">

            </li>
            <li class="scrollable-container media-list ps ps--active-y">
                <a class="d-flex justify-content-between" href="/{{ env('ADMIN_ROUTE_PREFIX') }}/recharge">
                    <div class="media d-flex align-items-start">
                        <div class="media-body">
                            您有<span id="recharge"></span>条充值请求未处理
                        </div>
                    </div>
                </a>
                <a class="d-flex justify-content-between" href="/{{ env('ADMIN_ROUTE_PREFIX') }}/withdraws">
                    <div class="media d-flex align-items-start">
                        <div class="media-body">
                            您有<span id="withdraw"></span>条提现请求未处理
                        </div>
                    </div>
                </a>
                <a class="d-flex justify-content-between" href="/{{ env('ADMIN_ROUTE_PREFIX') }}/agent-applys">
                    <div class="media d-flex align-items-start">
                        <div class="media-body">
                            您有<span id="agent_apply"></span>条代理申请请求未处理
                        </div>
                    </div>
                </a>
                <a class="d-flex justify-content-between" href="/{{ env('ADMIN_ROUTE_PREFIX') }}/activity-apply">
                    <div class="media d-flex align-items-start">
                        <div class="media-body">
                            您有<span id="activity_apply"></span>条活动申请请求未处理
                        </div>
                    </div>
                </a>
                <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
                    <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                </div>
                <div class="ps__rail-y" style="top: 0px; right: 0px; height: 254px;">
                    <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 184px;"></div>
                </div>
                <audio src="" id="recharge_apply_audio"></audio>
                <audio src="" id="withdraw_apply_audio"></audio>
                <audio src="" id="activity_apply_audio"></audio>
                <audio src="" id="agent_apply_audio"></audio>
            </li>
        </ul>
    </li>
</ul>
<script>
	function test(e){
        $.ajax({
            url: '/api/credit',
            type: 'post',
			data:{api_code:e.id},
            success: function(res) {
				if(res.code == 200){
					$("#money_"+e.id).html(res.data);
				}else{
					$("#money_"+e.id).html(res.message);
				}
            }
        })

	}
    $(document).ready(function() {
        $.ajax({
            url: '/{{ env("ADMIN_ROUTE_PREFIX") }}/alert',
            type: 'post',
            success: function(res) {
                if (res.alert_type == '1' || res.alert_type == '3') {
                    $('.alert-item').addClass('show');
                    $('#recharge').text(res.recharge_apply);
                    $('#withdraw').text(res.withdraw_apply);
                    $('#agent_apply').text(res.agent_apply);
                    $('#activity_apply').text(res.activity_apply);
                }
                if (res.alert_type == '1' || res.alert_type == '3') {
                    $('#recharge_apply_audio').attr('src',res.recharge_apply_audio);
                    $('#recharge_apply_audio')[0].play();
                }

            }
        })
    })
</script>