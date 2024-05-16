<?php

namespace App\Http\Controllers;

use App\Models\Permissions;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PermissionsController extends Controller
{
    public function index(Request $request):Response{

        $permission = Permissions::join("modules","modules.id", "=","permissions.module_id")->where("permissions.role_id", "=", $request->role)->get();

        return Inertia::render("Roles/Permissions/index",[
            "permissions" => $permission
        ]);
    }
}
