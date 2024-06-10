<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PlaceController extends Controller
{
    public function show($place)
    {
        // Validate the request
        

        // Retrieve the place with discounts
        $place = Place::join("place_categories", "places.placeCategory_id","=","place_categories.id" )->findOrFail($place);

        $place->placeImage = $place->placeImage ? base64_encode($place->placeImage) : null;
        
        // Get the discounts related to the place
        $discountData = $place->discounts()->select([
            "users.id",
            "users.name",
            "users.image",
            "discountCreatedAt",
            "discountDescription",
            "discountEndsAt",
            "discountImage",
            "discountName",
            "discountUpdatedAt",
            "discounts.id"

        ])->join("users", "discounts.user_id", "=", "users.id")->paginate(10);
        

        return Inertia::render("Places/show", [
            'data' => [
                'place' => $place,
                'discountData' => $discountData,
            ],
        ]);
    }

}
  



