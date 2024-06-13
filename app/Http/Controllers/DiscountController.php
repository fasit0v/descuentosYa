<?php
namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Discount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DiscountController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validar la solicitud
            $request->validate([
                "discountName" => "required|string|max:255",
                "discountDescription" => "nullable|string|max:255",
                "place_id" => "required|integer",
                "user_id" => "required|integer",
                "discountImage" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
                "discountEndsAt" => "nullable|date"
            ]);

            // Crear una nueva instancia de Discount
            $discount = new Discount();
            $discount->discountName = $request->discountName;
            $discount->discountDescription = $request->discountDescription;
            $discount->place_id = $request->place_id;
            $discount->user_id = $request->user_id;
            $discount->discountCreatedAt = now();
            $discount->discountEndsAt = $request->discountEndsAt;

            // Guardar el descuento para obtener el ID
            $discount->save();

            // Almacenar la imagen si está presente
            if ($request->hasFile('discountImage')) {
                $discountImage = $request->file('discountImage');
                $imageName = 'images/discounts/' . time() . '_' . $discount->id . '.' . $discountImage->getClientOriginalExtension();
                $discountImage->storeAs('public', $imageName);

                // Actualizar la ruta de la imagen en la base de datos
                $discount->discountImage = "/storage/".$imageName;
                $discount->discountUpdatedAt = null;
                $discount->save();
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

    public function destroy()
    {
        // Método destroy
    }

    public function update()
    {
        // Método update
    }

    public function show($discount, Request $request){

        

        $userId = $request->user()->id;

        $discountData = Discount::select([
                "users.id as user_id",
                "users.name as user_name",
                "users.image as user_image",
                "discounts.discountCreatedAt",
                "discounts.discountDescription",
                "discounts.discountEndsAt",
                "discounts.discountImage",
                "discounts.discountName",
                "discounts.discountUpdatedAt",
                "discounts.id as discount_id",
                DB::raw("(SELECT COUNT(*) FROM likes WHERE likes.user_id = {$userId} and likes.discount_id = discounts.id) as likedByUser"),
                DB::raw("COUNT(likes.id) AS likesQuantity"),
                DB::raw("COUNT(comments.id) AS commentsQuantity")
            ])->join("users", "discounts.user_id", "=", "users.id")
            ->leftJoin("likes", "likes.discount_id", "=", "discounts.id")
            ->leftJoin("comments","discounts.id","=","comments.discount_id")
            ->groupBy([
                "users.id",
                "users.name",
                "users.image",
                "discounts.discountCreatedAt",
                "discounts.discountDescription",
                "discounts.discountEndsAt",
                "discounts.discountImage",
                "discounts.discountName",
                "discounts.discountUpdatedAt",
                "discounts.id",
            ])
            ->findOrFail($discount);

        $commentsData = Comment::select([
            "users.id as user_id",
            "users.name as user_name",
            "users.image as user_image",
            "comments.commentCreateAt",
            "comments.commentDescription",
            "comments.commentImage",
            "comments.id as comment_id",
        ])
        ->join("users", "comments.user_id", "=", "users.id")
        ->where('comments.discount_id', $discountData->discount_id)
        ->groupBy([
            "users.id",
            "users.name",
            "users.image",
            "comments.commentCreateAt",
            "comments.commentDescription",
            "comments.commentImage",
            "comments.id",
        ])
    ->paginate(10);

        return Inertia::render("Discounts/Show", [
            'data' => [
                'discount' => $discountData,
                'commentsData' => $commentsData,
                
            ],
        ]);
    }
}
