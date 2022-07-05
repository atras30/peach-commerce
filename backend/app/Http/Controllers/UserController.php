<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use App\Models\Product;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

use function PHPUnit\Framework\isEmpty;

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
    $user = User::findOrFail($id);
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

    $user = User::create($request->all());
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
}
