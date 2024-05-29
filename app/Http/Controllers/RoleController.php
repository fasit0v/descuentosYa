<?php

namespace App\Http\Controllers;


use App\Models\Permissions;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use function PHPUnit\Framework\throwException;

class RoleController extends Controller
{

    public function index():Response{        
        $roles = Role::paginate(10)->through(function ($item){
            return [
        'id' => $item->id,
        'roleName' => $item->roleName,
            ];
    });

        return Inertia::render("Roles/index",[
            "roles" => $roles
        ]) ;
    }

    public function show(Request $request ){
        $role = Role::findOrFail($request->role);
        $permissions = Permissions::join("modules","modules.id", "=","permissions.module_id")->where("permissions.role_id", "=", $request->role)->select(["modules.moduleName", "permissions.canCreate","permissions.canRead","permissions.canUpdate","permissions.canDelete", "permissions.id"])->get();
        $users = Role::join("user_roles","user_roles.role_id", "=","roles.id")->join("users", "user_roles.user_id", "=", "users.id")->where("user_roles.role_id", "=", $request->role)->select(["users.name", "users.id" ])->get();

        return Inertia::render("Roles/show",[
            "data" =>[
                "role" => $role,
                "permissions" => $permissions,
                "users" => $users
            ]
        ]) ;
    }

    public function store(Request $request){

        $request->validate([
            'roleName' => ['required', "unique:roles,roleName"],
        ]);

        $lastId = Role::insertGetId(["roleName"=>$request->roleName]);
        return Redirect::route("roles.show",["role"=>$lastId] );
    }


    public function update(Request $request){

        $role = Role::find($request->role);

        return Inertia::render("Roles/update",[
            "role" => $role
        ]) ;
    }
    public function destroy(Request $request)
    {
        $request->validate([
            'roleName' => ['required'],
            "id"=>["required"]
        ]);

        Role::select("id")->where("id", "=",$request->id)->where("roleName", "=", $request->roleName)->delete();
        return Redirect::to('/roles');
    }
}
