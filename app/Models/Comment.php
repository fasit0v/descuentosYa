<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Comment extends Model
{

    public $fillable =[
        "commentName",
        "commentDescription",
        "commentImage"
    ];

    const CREATED_AT = "commentCreateAt";



    public function user():HasOne{
        return $this->hasOne(User::class);
    }

    public function discount():HasOne{
        return $this->hasOne(Place::class);
    }
    use HasFactory;
}
