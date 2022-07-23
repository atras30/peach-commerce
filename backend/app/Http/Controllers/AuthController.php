<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {
  public function login(Request $request) {
    //check email
    $user = User::firstWhere("email", $request->email);

    //check username
    if($user == null) {
      $user = User::firstWhere("username", $request->email);
    }

    if($user == null || Hash::check($request->password, $user->password) == false) {
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
    return response()->json([
      "user" => User::where("id", auth()->user()->id)->with("shopping_carts")->get()->first()
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
      "address" => "string|required"
    ]);

    $validatedData = $validator->validated();
    $validatedData["full_name"] = $validatedData["first_name"]." ".$validatedData["last_name"];
    $validatedData["password"] = Hash::make($validatedData["password"]);

    try {
      $createdUser = User::create($validatedData)->generateEmailVerificationToken();
    } catch(\Exception $e) {
      return response()->json($e->getMessage(), Response::HTTP_NOT_ACCEPTABLE);
    }
    
    return response()->json([
      "message" => "User has been created",
      "data" => $createdUser
    ], Response::HTTP_CREATED);
  }
}
