<?php

namespace App\Http\Controllers;

use App\Models\Permissions;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PermissionsController extends Controller
{
    public function store(Request $request){
        $request->validate(["moduleId"=>["required"],
        "roleId"=>["required"],
        "canCreate"=>["required"],
        "canRead"=>["required"],
        "canUpdate"=>["required"],
        "canDelete"=>["required"]]);
        
        $permissionRepeat = Permissions::where("modules_id","=", $request->moduleId)->where("roles_id", "=", $request->roleId)->get();

        if (!$permissionRepeat){
            Permissions::create([
                "roleId"=>$request->roleId,
                "moduleId"=>$request->moduleId,
                "canCreate"=>$request->canCreate,
                "canRead"=>$request->canRead,
                "canUpdate"=>$request->canUpdate,
                "canDelete"=>$request->canDelete
            ]);
        }
    }

}
