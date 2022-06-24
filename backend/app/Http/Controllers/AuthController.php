<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller {
  public function login(Request $request) {
    $user = User::firstWhere("email", $request->email);

    if (Hash::check($request->password, $user->password)) {
      $token = $user->createToken("myAppToken")->plainTextToken;

      return response()->json([
        "message" => "Logged in successfully",
        "token" => $token
      ], Response::HTTP_OK);
    }

    // return response()->json([
    //   "message" => "Login failed. Wrong email or password"
    // ], Response::HTTP_OK);
  }

  public function logout(Request $request) {
    auth()->user()->tokens()->delete();

    return [
      "message" => "Successfully Logged Out",
    ];
  }

  public function getUser(Request $request) {
    return response()->json([
      "user" => auth()->user()
    ], Response::HTTP_OK);
  }

  public function register(Request $request) {
  }
}
