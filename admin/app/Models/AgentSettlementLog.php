<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgentSettlementLog extends Model
{
    protected $fillable = [
        'agent_id',
        'amount',
        'type',
        'details'
    ];

    public function agent()
    {
        return $this->belongsTo(User::class, 'agent_id');
    }
} 