<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Permissions extends Model
{
    use HasFactory;


    protected $fillable=[
        "canCreate", "canRead", "canUpdate", "canDelete"
    ];


    public function role():BelongsTo{
        return $this->belongsTo(Role::class);
    }

    public function module():BelongsTo{
        return $this->belongsTo(Module::class);
    }
}
