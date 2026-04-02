@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">选择支付方式</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('payment.create') }}" id="paymentForm">
                        @csrf
                        <div class="form-group">
                            <label for="amount">充值金额</label>
                            <input type="number" class="form-control @error('amount') is-invalid @enderror" 
                                id="amount" name="amount" value="{{ old('amount') }}" step="0.01" required>
                            @error('amount')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="payment-channels">
                            @foreach($channels as $channel)
                            <div class="payment-channel">
                                <input type="radio" name="channel_id" value="{{ $channel->id }}" 
                                    id="channel_{{ $channel->id }}" {{ old('channel_id') == $channel->id ? 'checked' : '' }}>
                                <label for="channel_{{ $channel->id }}">
                                    <img src="{{ asset('images/payment/' . $channel->type . '.png') }}" 
                                        alt="{{ $channel->name }}">
                                    <span>{{ $channel->name }}</span>
                                    @if($channel->description)
                                        <small class="text-muted">{{ $channel->description }}</small>
                                    @endif
                                </label>
                            </div>
                            @endforeach
                        </div>

                        <div class="form-group mt-4">
                            <button type="submit" class="btn btn-primary btn-block">
                                确认支付
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@push('styles')
<style>
.payment-channels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.payment-channel {
    position: relative;
}

.payment-channel input[type="radio"] {
    position: absolute;
    opacity: 0;
}

.payment-channel label {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.payment-channel input[type="radio"]:checked + label {
    border-color: #007bff;
    background-color: #f8f9fa;
}

.payment-channel img {
    width: 48px;
    height: 48px;
    margin-bottom: 0.5rem;
}

.payment-channel span {
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.payment-channel small {
    text-align: center;
}
</style>
@endpush

@push('scripts')
<script>
$(document).ready(function() {
    $('#paymentForm').on('submit', function(e) {
        e.preventDefault();
        
        const amount = $('#amount').val();
        const channelId = $('input[name="channel_id"]:checked').val();
        
        if (!amount || !channelId) {
            alert('请选择支付金额和支付方式');
            return;
        }
        
        this.submit();
    });
});
</script>
@endpush
@endsection 