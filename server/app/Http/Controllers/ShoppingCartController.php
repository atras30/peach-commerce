<?php

namespace App\Http\Controllers;

use App\Models\ShoppingCart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ShoppingCartController extends Controller {
  public function store(Request $request) {
    $user = User::with("shopping_carts")->find(auth()->user()->id);
    $shoppingCarts = $user->shopping_carts;

    foreach ($shoppingCarts as $eachShoppingCart) {
      if ($eachShoppingCart->product_id == $request->product_id) {
        $cartToBeDeleted = ShoppingCart::where("product_id", $request->product_id)->get()->first();

        try {
          $cartToBeDeleted = $cartToBeDeleted->delete();
        } catch (\Exception $e) {
          return response()->json([
            "error" => $e->getMessage()
          ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
          "message" => "deleted",
          "deleted_cart" => $cartToBeDeleted
        ], Response::HTTP_OK);
      }
    }

    $validator = Validator::make($request->all(), [
      "user_id" => "integer|required",
      "product_id" => "integer|required"
    ]);

    if ($validator->fails()) {
      return response()->json([
        "errors" => $validator->errors()
      ], Response::HTTP_NOT_ACCEPTABLE);
    }

    $validated = $validator->validated();

    try {
      ShoppingCart::create($validated);
    } catch (\Exception $e) {
      return response()->json([
        "error" => $e->getMessage()
      ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    return response()->json([
      "message" => "created",
    ], Response::HTTP_CREATED);
  }

  public function toggleActive($id) {
    $shoppingCart = ShoppingCart::findOrFail($id);
    $shoppingCart->is_active = !$shoppingCart->is_active;

    try {
      $shoppingCart->update();
    } catch (\Exception $e) {
      return response()->json([
        "error" => $e->getMessage()
      ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    return response()->json([
      "message" => "success"
    ], Response::HTTP_OK);
  }
}
