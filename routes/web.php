<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RoleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/* Home */
Route::get('/', [MapController::class,"index"])->name("home");

/* Acerca */
Route::get('/acerca', function () {
    return Inertia::render('Acerca');
})->name('acerca');


/* Places with discounts */
Route::get("/places/{place}", [PlaceController::class,"show"]);

/* Discount  */
Route::resource("discounts", DiscountController::class)->only(["store", "update","destroy" ])->middleware(["auth"]);

Route::get("/discounts/{discount}",[DiscountController::class, "show"]);

/* Likes */
Route::post("/likes",[LikeController::class,"like"])->middleware(["auth"]);

/* Comments */
Route::resource("/comments", CommentController::class)->only([ "store", "update", "destroy"])->middleware(["auth"]);

/* Reportes TODO */
Route::resource("reportes", ReportController::class)->only(["index", "store"])->middleware(["auth"]);

/* Roles */
Route::resource("roles", RoleController::class)->only(["index","show" ,"store", "update", "destroy"])->middleware(["auth"]);

/* Roles Permission */
Route::resource("permissions", PermissionsController::class)->only(["store", "update", "destroy"])->middleware(["auth"]);

Route::post("/userRoles",[RoleController::class, "userToRole"])->middleware(["auth"]);

Route::get("/profile/{user}",[ProfileController::class,"show"]);

Route::middleware('auth')->group(function () {
    Route::get('/profileconfig', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profileconfig', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profileconfig', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
