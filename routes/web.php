<?php

use App\Http\Controllers\DiscountController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



/* Home */
Route::get('/', [MapController::class,"index"])->name("home");

/* Acerca */
Route::get('/acerca', function () {
    return Inertia::render('Acerca');
})->name('acerca');



/* Places */
Route::get("/places/{place}", [PlaceController::class,"show"]);

/* Discount */
Route::resource("discounts", DiscountController::class)->only(["store","destroy","update" ])->middleware(["auth"]);

/* Reportes TODO */
Route::resource("reportes", ReportController::class)->only(["index", "store", "update", "destroy"])->middleware(["auth"]);

/* Roles */
Route::resource("roles", RoleController::class)->only(["index","show" ,"store", "update", "destroy"])->middleware(["auth"]);

/* Roles Permission */
Route::resource("permissions", PermissionsController::class)->only(["store", "update", "destroy"])->middleware(["auth"]);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
