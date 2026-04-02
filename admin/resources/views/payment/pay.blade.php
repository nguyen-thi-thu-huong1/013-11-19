@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">支付订单</div>

                <div class="card-body">
                    <div class="order-info mb-4">
                        <h5>订单信息</h5>
                        <p>订单号：{{ $order_no }}</p>
                        <p>支付金额：{{ number_format($payment_data['amount'], 2) }} 元</p>
                    </div>

                    @if($channel->type == 'alipay')
                        <div class="alipay-payment">
                            <div id="alipay-qrcode"></div>
                            <p class="text-center mt-3">请使用支付宝扫码支付</p>
                        </div>
                    @elseif($channel->type == 'wechat')
                        <div class="wechat-payment">
                            <div id="wechat-qrcode"></div>
                            <p class="text-center mt-3">请使用微信扫码支付</p>
                        </div>
                    @elseif($channel->type == 'bank')
                        <div class="bank-payment">
                            <div class="bank-info">
                                <p>开户行：{{ $payment_data['bank_name'] }}</p>
                                <p>账户名：{{ $payment_data['account_name'] }}</p>
                                <p>账号：{{ $payment_data['account_number'] }}</p>
                                <p>金额：{{ number_format($payment_data['amount'], 2) }} 元</p>
                            </div>
                            <div class="alert alert-info">
                                <p>请使用以上银行账户进行转账，转账时请备注订单号：{{ $order_no }}</p>
                                <p>转账完成后，系统将自动确认到账</p>
                            </div>
                        </div>
                    @endif

                    <div class="payment-status mt-4">
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" 
                                role="progressbar" style="width: 0%"></div>
                        </div>
                        <p class="text-center mt-2" id="status-message">等待支付...</p>
                    </div>

                    <div class="text-center mt-4">
                        <a href="{{ route('payment.index') }}" class="btn btn-secondary">返回</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@push('styles')
<style>
.order-info {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
}

.bank-info {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.bank-info p {
    margin-bottom: 0.5rem;
}

#alipay-qrcode, #wechat-qrcode {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}
</style>
@endpush

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
<script>
$(document).ready(function() {
    const orderNo = '{{ $order_no }}';
    let checkCount = 0;
    const maxChecks = 60; // 最多检查60次，即5分钟

    @if($channel->type == 'alipay')
        new QRCode(document.getElementById("alipay-qrcode"), {
            text: '{{ $payment_data["pay_url"] }}',
            width: 200,
            height: 200
        });
    @elseif($channel->type == 'wechat')
        new QRCode(document.getElementById("wechat-qrcode"), {
            text: '{{ $payment_data["code_url"] }}',
            width: 200,
            height: 200
        });
    @endif

    function checkPaymentStatus() {
        if (checkCount >= maxChecks) {
            $('#status-message').text('支付超时，请重新发起支付');
            $('.progress-bar').css('width', '100%');
            return;
        }

        $.get('{{ route("payment.check-status") }}', { order_no: orderNo })
            .done(function(response) {
                if (response.success) {
                    const status = response.data.status;
                    const message = response.data.message;
                    
                    $('#status-message').text(message);
                    
                    if (status === 2) { // 支付成功
                        $('.progress-bar').css('width', '100%');
                        setTimeout(function() {
                            window.location.href = '{{ route("payment.success") }}';
                        }, 1500);
                        return;
                    } else if (status === 3) { // 支付失败
                        $('.progress-bar').css('width', '100%');
                        return;
                    }
                    
                    // 更新进度条
                    const progress = (checkCount / maxChecks) * 100;
                    $('.progress-bar').css('width', progress + '%');
                    
                    checkCount++;
                    setTimeout(checkPaymentStatus, 5000); // 每5秒检查一次
                }
            })
            .fail(function() {
                $('#status-message').text('检查支付状态失败，请刷新页面重试');
            });
    }

    checkPaymentStatus();
});
</script>
@endpush
@endsection 