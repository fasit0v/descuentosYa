<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index(){   
        
        $places = Place::select(
            "places.id",
            "places.placeName",
            "places.placeAddress", 
            "places.placeLongitude", 
            "places.placeLatitude", 
            "places.placeCategory",
            DB::raw('count(discounts.id) as discountQuantity')
        )
        ->leftJoin("discounts", "discounts.place_id", "=", "places.id")
        ->groupBy("places.id", 
            "places.placeName",
            "places.placeAddress", 
            "places.placeLongitude", 
            "places.placeLatitude", 
            "places.placeCategory",)
        ->get();


        return Inertia::render("Home",["data"=>["places"=> $places]]) ;
    }
}
