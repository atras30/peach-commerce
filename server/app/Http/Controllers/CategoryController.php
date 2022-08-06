<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoryController extends Controller {
  public function index() {
    $categories = Category::all();

    return response()->json([
      "message" => "Successfully fetched data",
      "categories" => $categories
    ], Response::HTTP_OK);
  }
}
