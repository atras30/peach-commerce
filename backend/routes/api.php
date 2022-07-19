<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailController;

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
Route::post("/mail/verification/verify/{verification:token}", [MailController::class, "verifyEmail"]);
// Route::post("/mail/password/verify/{verification:token}", [MailController::class, "verifyEmail"]);
// Route::post("/mail/password/resend/{verification:token}", [MailController::class, "verifyEmail"]);

Route::post("/auth/login", [AuthController::class, "login"]);
Route::post("/auth/register", [AuthController::class, "register"]);

Route::group(["middleware" => ["auth:sanctum"]], function () {
  Route::post("/mail/verification/resend/{user:email}", [MailController::class, "resendEmail"]);
  Route::post("/auth/logout", [AuthController::class, "logout"]);
  Route::get("/auth/user", [AuthController::class, "getUser"]);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
