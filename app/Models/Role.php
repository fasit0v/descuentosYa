<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        "roleName"
    ];


    public function user():BelongsToMany{
        return $this->belongsToMany(User::class,"user_roles", 'role_id','user_id' );
    }

    public function permissions():HasMany{
        return $this->hasMany(Permissions::class);
    }
}
