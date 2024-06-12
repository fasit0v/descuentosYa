<?php

namespace App\Http\Controllers;


use App\Models\Module;
use App\Models\Permissions;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
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
        $users = Role::join("user_roles","user_roles.role_id", "=","roles.id")->join("users", "user_roles.user_id", "=", "users.id")->where("user_roles.role_id", "=", $request->role)->select(["users.name", "users.id", "users.image","users.email" ])->get();
        $modules = Module::all();
        $usersWithOutThisRole = User::whereDoesntHave("role", function($query) use( $request) {
          $query->where("roles.id", $request->role);  
        })->get();

        return Inertia::render("Roles/show",[
            "data" =>[
                "role" => $role,
                "permissions" => $permissions,
                "users" => $users,
                "modules" => $modules,
                "usersWithOutThisRole"=>$usersWithOutThisRole
            ]
        ]) ;
    }


    public function store(Request $request){

        $request->validate([
            'roleName' => ['required', "unique:roles,roleName"],
        ]);

        $lastId = Role::insertGetId(["roleName"=>$request->roleName]);
        return to_route("roles.show",["role"=>$lastId] );
    }


    public function update(Request $request){

        $request->validate([
            'roleName' => ['required', "unique:roles,roleName"],
            'id' => ['required'],
        ]);


        Role::where("id", "=", $request->id)->update(["roleName"=>$request->roleName]);

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

    public function userToRole(Request $request){
        try {
            $request->validate([
                "role_id"=> "required|integer",
                "user_id"=> "required|integer"
            ]);
            
            $userRepeat = DB::table("user_roles")->where("user_id", "=",$request->user_id)
                ->where("role_id","=", $request->role_id)
                ->get();
    
            if (!($userRepeat->isEmpty())) {
                    // Lanzar una excepción de validación si la combinación ya existe
                
                DB::table("user_roles")
                    ->where("role_id" ,"=" ,$request->role_id)
                    ->where("user_id", "=", $request->user_id)
                    ->delete();
                
            }else{
                
                            DB::table("user_roles")->insert([
                                "role_id" => $request->role_id,
                                "user_id" => $request->user_id
                            ]);

            }


            // Responder con éxito usando Inertia
            return redirect()->back()->with('success', 'Se ha agregado el usuario');

        } catch (ValidationException $e) {
            // Manejar las excepciones de validación específicamente
            return redirect()->back()->withErrors($e->errors() )->withInput();
        } catch (\Exception $e) {
            // Manejar cualquier otra excepción
            return redirect()->back()->with('error', 'An unexpected error occurred: ' . $e->getMessage());
        }



    }

}
