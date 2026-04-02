<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentChannel extends Model
{
    protected $fillable = [
        'name',
        'type',
        'config',
        'status',
        'sort',
        'min_amount',
        'max_amount',
        'description'
    ];

    protected $casts = [
        'config' => 'array',
        'status' => 'boolean',
        'min_amount' => 'decimal:2',
        'max_amount' => 'decimal:2'
    ];

    public function isAvailable()
    {
        return $this->status && $this->min_amount > 0 && $this->max_amount > 0;
    }

    public function validateAmount($amount)
    {
        return $amount >= $this->min_amount && $amount <= $this->max_amount;
    }

    public function getConfig($key = null)
    {
        if ($key) {
            return $this->config[$key] ?? null;
        }
        return $this->config;
    }
} 