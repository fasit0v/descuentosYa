<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index(Request $request){   
        
        
        if (isset($request->rubro, $request->descuento)) {
            $places = Place::select(
                "places.id",
                "places.placeName",
                "places.placeAddress", 
                "places.placeLongitude", 
                "places.placeLatitude", 
                "place_categories.placeCategoryName",
                "places.placeCategory_id",
                DB::raw('COUNT(discounts.id) AS discountQuantity')
            )
            ->join("place_categories", "place_categories.id", "=", "places.placeCategory_id")
            ->leftJoin("discounts", "discounts.place_id", "=", "places.id")
            ->where("places.placeCategory_id", "=", $request->rubro)
            ->groupBy(
                "places.id", 
                "places.placeName",
                "places.placeAddress", 
                "places.placeLongitude", 
                "places.placeLatitude",
                "places.placeCategory_id",
                "place_categories.placeCategoryName",
            )
            ->having(DB::raw('COUNT(discounts.id)'), $request->descuento == 1 ? ">" : "=", 0)
            ->get();

            
        } else if(isset($request->rubro)){
            $places = Place::select(
                "places.id",
                "places.placeName",
                "places.placeAddress", 
                "places.placeLongitude", 
                "places.placeLatitude", 
                "place_categories.placeCategoryName",
                "places.placeCategory_id",
                DB::raw('COUNT(discounts.id) AS discountQuantity')
            )
            ->join("place_categories", "place_categories.id", "=", "places.placeCategory_id")
            ->leftJoin("discounts", "discounts.place_id", "=", "places.id")
            ->where("places.placeCategory_id", "=", $request->rubro)
            ->groupBy(
                "places.id", 
                "places.placeName",
                "places.placeAddress", 
                "places.placeLongitude", 
                "places.placeLatitude",
                "places.placeCategory_id",
                "place_categories.placeCategoryName",
            )
            ->get();
        }else if(isset($request->descuento)){
            $places = Place::select(
                "places.id",
                "places.placeName",
                "places.placeAddress", 
                "places.placeLongitude", 
                "places.placeLatitude", 
                "place_categories.placeCategoryName",
                "places.placeCategory_id",
                DB::raw('COUNT(discounts.id) AS discountQuantity')
            )
            ->join("place_categories", "place_categories.id", "=", "places.placeCategory_id")
            ->leftJoin("discounts", "discounts.place_id", "=", "places.id")
            ->groupBy(
                "places.id", 
                "places.placeName",
                "places.placeAddress", 
                "places.placeLongitude", 
                "places.placeLatitude",
                "places.placeCategory_id",
                "place_categories.placeCategoryName",
            )
            ->having(DB::raw('COUNT(discounts.id)'), $request->descuento == 1 ? ">" : "=", 0)
            ->get();
        }else{
            $places = Place::select(
                "places.id",
                "places.placeName",
                "places.placeAddress", 
                "places.placeLongitude", 
                "places.placeLatitude", 
                "place_categories.placeCategoryName",
                "places.placeCategory_id",
                DB::raw('COUNT(discounts.id) AS discountQuantity')
            )
            ->join("place_categories", "place_categories.id", "=", "places.placeCategory_id")
            ->leftJoin("discounts", "discounts.place_id", "=", "places.id")
            ->groupBy(
                "places.id", 
                "places.placeName",
                "places.placeAddress", 
                "places.placeLongitude", 
                "places.placeLatitude",
                "places.placeCategory_id",
                "place_categories.placeCategoryName",
            )
            ->get();
        }
        
        $placeCategories= DB::table("place_categories")->get();

        return Inertia::render("Home",["data"=>["places"=> $places, "placeCategories"=>$placeCategories]]) ;
    }
}
