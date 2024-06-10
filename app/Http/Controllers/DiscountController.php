<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    public function store(Request $request){
        $request->validate([
            "discountName"=> "required",
            "place_id"=> "required",
            "user_id"=>"required"
        ]);

        $discountId = Discount::insertGetId([
            "discountName"=>$request->discountName,
            "discountDescription"=> $request-> discountDescription,
            "place_id"=> $request->place_id,
            "user_id"=> $request->user_id,
            "discountCreatedAt"=> now(),
            "DiscountEndsAt"=> $request->discountEndsAt || new Carbon(now()->addDay())
        ]);

        if (isset($request->discountImage)) {
            $discount = Discount::find($discountId);
            $discount->discountImage = $request->discountImage;
        }

        return redirect()->back()->with('success', 'El descuento se ha creado');
    }


    public function destroy(){

    }

    public function update(){
        
    }
}
