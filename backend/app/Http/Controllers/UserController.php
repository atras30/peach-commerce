<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Address;
use Webpatser\Uuid\Uuid;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $users = User::all();

    foreach ($users as $user) {
      $user["addresses"] = $user->addresses;
    }

    return response()->json([
      "message" => "Successfully fetched data",
      "users" => $users
    ], Response::HTTP_OK);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    $user = User::where("id", $id)->with("shopping_carts")->get();
    return response()->json([
      "message" => "Sucessfully fetched a user",
      "user" => $user
    ], Response::HTTP_OK);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    return response()->json(["message" => "please use /api/auth/register endpoint instead."], Response::HTTP_UNPROCESSABLE_ENTITY);

    $request->validate([
      'first_name' => 'string|max:255',
      'last_name' => 'string|nullable|max:255',
      'username' => 'string|max:255|unique:users,username',
      "email" => "string|required|unique:users,email|email:rfc,dns",
      'password' => 'string|max:255',
      'phone_number' => 'string|max:255',
      'peach_coin' => 'integer|min:0',
      "address" => "string|required"
    ]);

    $user = User::create($request->all())->generateEmailVerificationToken();

    return response()->json([
      "message" => "User was successfully created!",
      "user" => $user
    ], Response::HTTP_CREATED);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $request->validate([
      'first_name' => 'string|max:255',
      'last_name' => 'string|nullable|max:255',
      'username' => 'string|max:255|unique:users,username,' . $id,
      'email' => "string|max:255|unique:users,email,{$id}|email:rfc,dns",
      'password' => 'string|max:255',
      'phone_number' => 'string|max:255',
      'peach_coin' => 'integer|min:0',
      "address" => "string|max:255"
    ]);

    $updatedUser = User::findOrFail($id);

    $fullName = $request->first_name;

    if (isset($request->last_name)) {
      $fullName = $fullName . " " . $request->last_name;
    } else {
      $fullName = $fullName . " " . $updatedUser->last_name;
    }

    $updatedUser->update($request->all());
    $updatedUser->update([
      "full_name" => $fullName
    ]);

    if ($request->last_name == null) {
      $updatedUser->update([
        "full_name" => $updatedUser->first_name
      ]);
    }

    return response()->json([
      "message" => "User was successfully updated",
      "user" => $updatedUser
    ], Response::HTTP_OK);
  }

  public function destroy($id) {
    $user = User::findOrFail($id);
    $user->delete();

    $relatedAddresses = Address::where("user_id", $id)->get();

    foreach ($relatedAddresses as $address) {
      $address->delete();
    }

    return response()->json([
      "message" => "Product was successfully deleted",
      "deleted_product" => $user
    ], Response::HTTP_OK);
  }

  public function getUserByEmail($email) {
    $user = User::firstWhere("email", $email);
    if ($user == null) {
      return response()->json([
        "message" => "User was not found",
      ], Response::HTTP_OK);
    }

    return response()->json([
      "message" => "Successfully fetched one user",
      "user" => $user
    ], Response::HTTP_OK);
  }

  public function changeProfilePicture(Request $request) {    
    $user = User::findOrFail(auth()->user()->id);
    
    $validator = Validator::make($request->all(), [
      "profile_picture" => 'required|mimes:png,jpg,jpeg|max:4096',
    ]);

    if ($validator->fails()) {
      return response()->json([
        "errors" => $validator->errors()
      ], Response::HTTP_NOT_ACCEPTABLE);
    }

    try {
      $profilePicturePath = $request->file("profile_picture")->storeAs("users/user_id_{$request->user()->id}/profile_picture", pathinfo($request->file("profile_picture")->getClientOriginalName(), PATHINFO_FILENAME) . "_" . Uuid::generate()->string . "." . $request->file("profile_picture")->getClientOriginalExtension());
      $user->profile_picture_path = $profilePicturePath;
      $user->update();
    } catch(\Exception $e) {
      return response()->json([
        "errors" => $e->getMessage(),
        "message" => "failed"
      ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    return response()->json([
      "message" => "success"
    ], Response::HTTP_OK);
  }
}
