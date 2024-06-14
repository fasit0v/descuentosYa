<?php

namespace App\Http\Controllers;


use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    
    public function like(Request $request){



        $request->validate([
            "discount_id"=>"required|integer",

        ]);

        $user_id = $request->user()->id;
        
        $discount = Like::where("discount_id","=",$request->discount_id)
            ->where("user_id","=", $user_id)
            ->get();

        if ($discount->isEmpty()) {
            Like::insert([
                "discount_id"=>$request->discount_id,
                "user_id"=>$user_id
            ]);
        }else{
            Like::where("discount_id","=",$request->discount_id)
            ->where("user_id","=", $user_id)
            ->delete();
        }
    }
}
