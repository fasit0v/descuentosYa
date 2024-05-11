<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{

    private function manageRole(Request $request){
        return User::join('user_roles', 'users.id', '=', 'user_roles.user_id')
    ->join('roles', 'user_roles.role_id', '=', 'roles.id')
    ->join('permissions', 'roles.id', '=', 'permissions.role_id')
    ->join("modules", "modules.id" , "=", "permissions.module_id")
    ->select("permissions.id",'permissions.canCreate', 'permissions.canRead', 'permissions.canUpdate', 'permissions.canDelete', "modules.id", "modules.moduleName", "modules.moduleRoute")
    ->where('users.id', "=",$request->user()->id,"and", "modules.moduleRoute", "=", $request->route()->getName() )
    ->get();

    }


    public function index(Request $request){
        $userPermissions = $this->manageRole($request);


        return Inertia::render("Roles/index",[
            "permisos" => $userPermissions
        ]) ;
    }

    public function store(){
        
    }
    public function update(){
        
    }
    public function destroy(){
        
    }
}
