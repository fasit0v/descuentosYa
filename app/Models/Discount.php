<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Discount extends Model
{
    use HasFactory;

    public $fillable =[
        "discountName",
        "discountDescription",
        "discountImage",
        "discountEndsAt",
    ];

    const CREATED_AT = "discountCreatedAt";
    const UPDATED_AT = "discountUpdatedAt";


    public function user():HasOne{
        return $this->hasOne(User::class);
    }

    public function place():HasOne{
        return $this->hasOne(Place::class);
    }

    public function comments():HasMany{
        return $this->hasMany(Comment::class);
    }

    public function likes():HasMany{
        return $this->hasMany(Like::class);
    }

    public function reports():HasMany{
        return $this->hasMany(Report::class);
    }

}
