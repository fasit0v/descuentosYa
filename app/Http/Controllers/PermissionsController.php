<?php
namespace App\Http\Controllers;

use App\Models\Permissions;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PermissionsController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validar la solicitud
            $request->validate([
                "moduleId" => ["required"],
                "roleId" => ["required"],
                "canCreate" => ["required"],
                "canRead" => ["required"],
                "canUpdate" => ["required"],
                "canDelete" => ["required"]
            ]) ;

            // Verificar si ya existe la combinación de moduleId y roleId
            $permissionRepeat = Permissions::where("module_id", "=",$request->moduleId)
                ->where("role_id","=", $request->roleId)
                ->get();

            if (!($permissionRepeat->isEmpty())) {
                // Lanzar una excepción de validación si la combinación ya existe
                throw ValidationException::withMessages([
                    'moduleId' => 'Este permiso existe para este modulo',
                    "error" => "Ocurrio un error al crear el permiso"
                ]);
            }

            // Crear el permiso si no existe
            Permissions::insert([
                "role_id" => $request->roleId,
                "module_id" => $request->moduleId,
                "canCreate" => $request->canCreate,
                "canRead" => $request->canRead,
                "canUpdate" => $request->canUpdate,
                "canDelete" => $request->canDelete
            ]);

            // Responder con éxito usando Inertia
            return redirect()->back()->with('success', 'El permiso se ha creado');

        } catch (ValidationException $e) {
            // Manejar las excepciones de validación específicamente
            return redirect()->back()->withErrors($e->errors() )->withInput();
        } catch (\Exception $e) {
            // Manejar cualquier otra excepción
            return redirect()->back()->with('error', 'An unexpected error occurred: ' . $e->getMessage());
        }
    }


    public function destroy(Request $request){
        $request->validate([
                "roleId" => ["required"],
                "permissionId"=>["required"],
                "moduleName" =>["required"]
            ]);

        Permissions::
        join("modules","modules.id", "=", "permissions.module_id")
        ->where("permissions.role_id", "=", $request->roleId)
        ->where("modules.moduleName", "=", $request->moduleName)
        ->where("permissions.id", "=", $request->permissionId)
        ->delete();

        return redirect()->back()->with('success', 'El permiso se ha borrado');

    }
}

