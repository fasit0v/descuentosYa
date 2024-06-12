<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Place extends Model
{
    use HasFactory;

    public $fillable =[
        "placeName",
        "placeDescription",
        "placeAddress",
        
    ];

    public $timestamp = false;

    public function discounts():HasMany{
        return $this->hasMany(Discount::class);
    }

    public function placeCategory():HasOne{
        return $this->hasOne(PlaceCategory::class);
    }
}
