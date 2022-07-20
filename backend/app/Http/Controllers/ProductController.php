<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class ProductController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $products = Product::with("reviews")->get();

    foreach($products as $product) {
      $product['discount'] = intval($product["discount"]);
      $product['total_sales'] = intval($product["total_sales"]);
      $product['stock'] = intval($product["stock"]);
    }

    return response()->json([
      "message" => "Successfully fetched data",
      "products" => $products
    ], Response::HTTP_OK);
  }

  /**
   * Display a listing of the resource based on string query.
   *
   * @return \Illuminate\Http\Response
   */
  public function search($query) {
    $products = Product::where("title", "like", "%" . $query . "%")->get();

    if (count($products) == 0) {
      return response()->json([
        "message" => "No data was found",
        "products" => []
      ], Response::HTTP_OK);
    }
    
    return response()->json([
      "message" => "Successfully fetched data",
      "products" => $products
    ], Response::HTTP_OK);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $validated = $request->validate([
      'title' => 'required',
      'discount' => 'required|integer|between:0,100',
      'price' => 'required|numeric|min:0',
      'user_id' => 'required',
      'stock' => 'required|numeric|min:1',
      'location' => 'required|string',
      'img_link' => 'required|string'
    ]);

    if (User::find($validated["user_id"]) == null) {
      return response()->json([
        "message" => "User was not found!"
      ], Response::HTTP_NOT_FOUND);
    }

    $product = Product::create($request->all());
    return response()->json([
      "message" => "Product was successfully created!",
      "product" => $product
    ], Response::HTTP_CREATED);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    $product = Product::with("reviews")->findOrFail($id);

    $product['discount'] = intval($product["discount"]);
    $product['total_sales'] = intval($product["total_sales"]);
    $product['stock'] = intval($product["stock"]);
    
    foreach($product["reviews"] as $review) {
      $review['rating'] = intval($review["rating"]);  
    }

    return response()->json([
      "message" => "Sucessfully fetched one product",
      "product" => $product
    ], Response::HTTP_OK);
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
      'discount' => 'numeric|between:0.00,100.00',
      'price' => 'numeric|min:0',
      'total_sales' => 'numeric|min:0',
      'stock' => 'numeric|min:1',
    ]);

    $updatedProduct = Product::findOrFail($id);
    $updatedProduct->update($request->all());

    return response()->json([
      "message" => "Product was successfully updated",
      "product" => $updatedProduct
    ], Response::HTTP_OK);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $product = Product::findOrFail($id);
    $product->delete();

    return response()->json([
      "message" => "Product was successfully deleted",
      "deleted_product" => $product
    ], Response::HTTP_OK);
  }
}
