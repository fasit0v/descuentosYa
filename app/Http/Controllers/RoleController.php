<?php

namespace App\Http\Controllers;


use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(){        
        $roles = Role::get();

        return Inertia::render("Roles/index",[
            "roles" => $roles
        ]) ;
    }

    static function getPermissions(Request $request){
        $rolePermissions = Role::leftJoin("permission", "permission.role_id", "roles.id")->join("modules", "modules.id", "permissions.module_id")->where("role.id", "=", $request->roleId)->get();
        return $rolePermissions;
    }

    public function store(){
        
    }
    public function update(){
        
    }
    public function destroy(){
        
    }
}
