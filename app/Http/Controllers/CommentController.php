<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CommentController extends Controller
{
    public function store(Request $request){
        try {
            // Validar la solicitud
            $request->validate([
                "commentDescription" => "nullable|string|max:255",
                "discount_id" => "required|integer",
                "user_id" => "required|integer",
                "commentImage" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
            ]);

            // Crear una nueva instancia de comment
            $comment = DB::table("comments")->insertGetId([
                "commentDescription" => $request->commentDescription,
                "discount_id" => $request->discount_id,
                "user_id" => $request->user_id,
                "commentCreateAt" => now()
            ]);


            

            // Almacenar la imagen si está presente
            if ($request->hasFile('commentImage')) {
                $commentImage = $request->file('commentImage');
                $imageName = 'images/comments/' . time() . '_' . $comment . '.' . $commentImage->getClientOriginalExtension();
                $commentImage->storeAs('public', $imageName);

                // Actualizar la ruta de la imagen en la base de datos
                DB::table("comments")->where("id", "=", $comment)->update([
                    "commentImage" => "/storage/".$imageName
                ]);
                
            }

            // Redireccionar con éxito
            return redirect()->back()->with('success', 'El descuento se ha creado');

        } catch (ValidationException $e) {
            // Manejar las excepciones de validación específicamente
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            // Manejar cualquier otra excepción
            return redirect()->back()->with('error', 'An unexpected error occurred: ' . $e->getMessage());
        }
    }
}
