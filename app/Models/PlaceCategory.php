<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaceCategory extends Model
{
    use HasFactory;

    public $fillable=[
        "placeCategoryName"
    ];

    public $timestamp=false;
}
