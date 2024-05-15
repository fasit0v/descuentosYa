<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Module extends Model
{
    use HasFactory;

    protected $fillable=[
        "moduleName", "moduleRoute"
    ];

    public function permission():HasMany{
        return $this->hasMany(Permissions::class);
    }

}
