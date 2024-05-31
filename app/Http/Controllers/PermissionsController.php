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
            return redirect()->back()->with('success', 'Permission created successfully');

        } catch (ValidationException $e) {
            // Manejar las excepciones de validación específicamente
            return redirect()->back()->withErrors($e->errors() )->withInput();
        } catch (\Exception $e) {
            // Manejar cualquier otra excepción
            return redirect()->back()->with('error', 'An unexpected error occurred: ' . $e->getMessage());
        }
    }
}

