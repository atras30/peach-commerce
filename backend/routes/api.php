<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ProductReviewCommentController;
use App\Http\Controllers\ShoppingCartController;

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

//Authenticated users
Route::group(["middleware" => ["auth:sanctum"]], function () {
  //Mails
  Route::post("/mail/verification/resend/{user:email}", [MailController::class, "resendEmail"]);

  //Authentications
  Route::post("/auth/logout", [AuthController::class, "logout"]);
  Route::get("/auth/user", [AuthController::class, "getUser"]);

  //Shopping Carts
  Route::post("/shopping-cart", [ShoppingCartController::class, "store"]);

  //Products
  Route::post("products", [ProductController::class, "store"]);
  Route::delete("products/{id}", [ProductController::class, "destroy"]);

  //Users
  Route::post("users/profile-picture", [UserController::class, "changeProfilePicture"]);// change profile picture
});

//Categories
Route::get("/categories", [CategoryController::class, "index"]);

//products
Route::get("/products", [ProductController::class, "index"]);
Route::get("/products/{id}", [ProductController::class, "show"]);
Route::get("/products/search/{query}", [ProductController::class, "search"]);

//users
Route::resource("users", UserController::class);
Route::get("users/find-by-email/{email}", [UserController::class, "getUserByEmail"]);

//product review comments
Route::post("/products/reviews/comments", [ProductReviewCommentController::class, "store"]);

//Emails
Route::post("/mail/verification/verify/{verification:token}", [MailController::class, "verifyEmail"]);

//Authentication
Route::post("/auth/login", [AuthController::class, "login"]);
Route::post("/auth/login/google", [AuthController::class, "loginByGoogle"]);
Route::post("/auth/register", [AuthController::class, "register"]);

//default route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});
