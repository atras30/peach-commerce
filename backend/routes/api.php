<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource("products", ProductController::class);
Route::resource("users", UserController::class);

Route::get("/products/search/{query}", [ProductController::class, "search"]);

Route::get("/auth/login", [AuthController::class, "login"]);
Route::get("/auth/logout", [AuthController::class, "login"]);
Route::get("/auth/register", [AuthController::class, "register"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
