<?php

namespace App\Http\Controllers;


use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function index():Response{        
        $roles = Role::where("roles.roleName", "!=", "aguara")->get();

        return Inertia::render("Roles/index",[
            "roles" => $roles
        ]) ;
    }


    public function store(){
        
    }
    public function update(){
        
    }
    public function destroy(){
        
    }
}
