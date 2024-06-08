<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaceController extends Controller
{
    public function show(Request $request)
    {
        // Validate the request
        $request->validate([
            'place' => 'required',
        ]);

        // Retrieve the place with discounts
        $place = Place::with('discounts')->findOrFail($request->place);
        
        // Get the discounts related to the place
        $discountData = $place->discounts()->paginate(10);

        return Inertia::render("Places/show", [
            'data' => [
                'place' => $place,
                'discountData' => $discountData,
            ],
        ]);
    }
}
