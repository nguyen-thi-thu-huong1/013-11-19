<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentChannelsTable extends Migration
{
    public function up()
    {
        Schema::create('payment_channels', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('渠道名称');
            $table->string('type')->comment('渠道类型：alipay/wechat/bank');
            $table->json('config')->comment('渠道配置');
            $table->boolean('status')->default(true)->comment('状态：0禁用/1启用');
            $table->integer('sort')->default(0)->comment('排序');
            $table->decimal('min_amount', 10, 2)->default(1.00)->comment('最小金额');
            $table->decimal('max_amount', 10, 2)->default(50000.00)->comment('最大金额');
            $table->string('description')->nullable()->comment('描述');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payment_channels');
    }
} 