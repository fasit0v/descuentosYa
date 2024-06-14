<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Discount;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function show($user, Request $request ){

        $user = User::findOrFail($user);

        $userId =$request->user()->id ?? null;

        if ($userId) {
            $discount = Discount::select([
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
                DB::raw("(SELECT COUNT(*) FROM likes WHERE likes.user_id = {$request->user()->id} and likes.discount_id = discounts.id) as likedByUser"),
                DB::raw("COUNT(likes.id) AS likesQuantity"),
                DB::raw("COUNT(comments.id) AS commentsQuantity")
                
            ])
            ->join("users", "discounts.user_id", "=", "users.id")
            ->leftJoin("likes", "likes.discount_id", "=", "discounts.id")
            ->leftJoin("comments","discounts.id","=","comments.discount_id")
            ->where("discounts.user_id","=",$user->id)
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
            ->paginate(10);;

        } else {
            $discount = Discount::select([
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
                
                DB::raw("COUNT(likes.id) AS likesQuantity"),
                DB::raw("COUNT(comments.id) AS commentsQuantity")
                
            ])
            ->join("users", "discounts.user_id", "=", "users.id")
            ->leftJoin("likes", "likes.discount_id", "=", "discounts.id")
            ->leftJoin("comments","discounts.id","=","comments.discount_id")
            ->where("discounts.user_id","=",$user->id)
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
            ->paginate(10);;

        }
        


        
        return Inertia::render("Profile/Show",[
            "data"=> [
                "discount" => $discount,
                "user"=> $user
            ]
        ]);
    }


    public function edit(Request $request): Response
    {
        return Inertia::render('ProfileConfig/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
