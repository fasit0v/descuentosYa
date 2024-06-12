<?php
namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PlaceController extends Controller
{
    public function show($place, Request $request)
    {
        // Retrieve the place with discounts
        $place = Place::join("place_categories", "places.placeCategory_id", "=", "place_categories.id")
            ->findOrFail($place);

        $place->placeImage = $place->placeImage ? base64_encode($place->placeImage) : null;

        // Get the discounts related to the place
        $currentDateTime = now();

        $userId = $request->user()->id;

        $discountData = $place->discounts()
            ->select([
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
                
            ])
            ->join("users", "discounts.user_id", "=", "users.id")
            ->leftJoin("likes", "likes.discount_id", "=", "discounts.id")
            ->leftJoin("comments","discounts.id","=","comments.discount_id")
            ->where("discounts.discountEndsAt", ">", $currentDateTime)
            ->orderBy("discounts.discountCreatedAt", "desc")
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
            ->paginate(10);

        return Inertia::render("Places/show", [
            'data' => [
                'place' => $place,
                'discountData' => $discountData,
            ],
        ]);
    }
}
