<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
	protected $table = "activities";
	
	protected $guarded = [];

	public function getBannerAttribute($value)
    {
        return env('APP_URL').'/uploads/'.$value;
    }
    
    public function type_data()
    {
        return $this->belongsTo('App\Models\ActivityType','type','id');
    }
}
