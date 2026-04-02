<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgentSettlementLogsTable extends Migration
{
    public function up()
    {
        Schema::create('agent_settlement_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('agent_id');
            $table->decimal('amount', 10, 2);
            $table->string('type');
            $table->text('details');
            $table->timestamps();
            
            $table->foreign('agent_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('agent_settlement_logs');
    }
} 