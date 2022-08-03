<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Webpatser\Uuid\Uuid;

class AuthController extends Controller {
  public function login(Request $request) {
    //check email
    $user = User::firstWhere("email", $request->email);

    //check username
    if ($user == null) {
      $user = User::firstWhere("username", $request->email);
    }

    if ($user == null || Hash::check($request->password, $user->password) == false) {
      return response()->json([
        "message" => "Login failed. Wrong email or password"
      ], Response::HTTP_OK);
    }

    $token = $user->createToken("myAppToken")->plainTextToken;

    return response()->json([
      "message" => "Logged in successfully",
      "token" => $token
    ], Response::HTTP_OK);
  }

  public function logout(Request $request) {
    auth()->user()->tokens()->delete();

    return [
      "message" => "Successfully Logged Out",
    ];
  }

  public function getUser(Request $request) {
    $user = User::where("id", auth()->user()->id)->with(["shopping_carts", "products"])->get()->first();

    foreach ($user["shopping_carts"] as $shoppingCart) {
      $shoppingCart["product_id"] = intval($shoppingCart["product_id"]);
    }

    return response()->json([
      "user" => $user
    ], Response::HTTP_OK);
  }

  public function register(Request $request) {
    $validator = Validator::make($request->all(), [
      "first_name" => "string|required",
      "last_name" => "string|required",
      "username" => "string|required|unique:users,username",
      "email" => "string|required|unique:users,email|email:rfc,dns",
      "password" => "string|required|min:8",
      "phone_number" => "string|required",
      "address" => "string|required",
      "profile_picture" => 'mimes:png,jpg,jpeg|max:4096',
      "registered_via" => "string"
    ]);

    if ($validator->fails()) {
      return response()->json([
        "message" => "failed creation of new user",
        "errors" => $validator->errors()
      ], Response::HTTP_NOT_ACCEPTABLE);
    }

    $validatedData = $validator->validated();
    $validatedData["full_name"] = $validatedData["first_name"] . " " . $validatedData["last_name"];
    $validatedData["password"] = Hash::make($validatedData["password"]);

    try {
      if (isset($validatedData["registered_via"]) && $validatedData["registered_via"] == "google") {
        $validatedData["email_verified_at"] = now();
        $createdUser = User::create($validatedData);
      } else {
        $createdUser = User::create($validatedData)->generateEmailVerificationToken();
      }

      $createdUser = User::findOrFail($createdUser->id);
      if($request->file("profile_picture")) {
        $createdUser->profile_picture_path = $request->file("profile_picture")->storeAs("users/user_id_{$createdUser->id}/profile_picture", pathinfo($request->file("profile_picture")->getClientOriginalName(), PATHINFO_FILENAME) . "_" . Uuid::generate()->string . "." . $request->file("profile_picture")->getClientOriginalExtension());
        $createdUser->update();
      }
    } catch (\Exception $e) {
      return response()->json($e->getMessage(), Response::HTTP_NOT_ACCEPTABLE);
    }

    return response()->json([
      "message" => "User has been created",
      "data" => $createdUser
    ], Response::HTTP_CREATED);
  }

  public function loginByGoogle(Request $request) {
    $validator = Validator::make($request->all(), [
      "email" => "string|email:rfc,dns"
    ]);

    if ($validator->fails()) {
      return response()->json([
        "errors" => $validator->errors()
      ], Response::HTTP_NOT_ACCEPTABLE);
    }

    $validated = $validator->validated();
    $user = User::firstWhere("email", $validated["email"]);

    if ($user == null) {
      return response()->json([
        "message" => "User was not found."
      ], Response::HTTP_NOT_ACCEPTABLE);
    }

    $token = $user->createToken("myAppToken")->plainTextToken;

    return response()->json([
      "message" => "Logged in successfully",
      "token" => $token
    ], Response::HTTP_OK);
  }
}
