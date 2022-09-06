<?php

namespace App\Http\Controllers;

use App\Models\ProductReview;
use App\Models\ProductReviewComment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ProductReviewCommentController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    //
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create() {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $validator = Validator::make($request->all(), [
      "product_review_id" => "integer|required",
      "comment" => "string|required",
      "user_id" => "integer|required"
    ]);

    if ($validator->fails()) {
      return response()->json([
        "message" => "Failed creating a new comment.",
        "errors" => $validator->errors()
      ], Response::HTTP_NOT_ACCEPTABLE);
    }

    $validated = $validator->validated();
    $comment = null;

    try {
      $comment = ProductReviewComment::create($validated);
    } catch (\Exception $e) {
      return response()->json([
        "message" => $e->getMessage()
      ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    return response()->json([
      "message" => "product review comment created.",
      "product_review_comment" => $comment
    ], Response::HTTP_CREATED);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id) {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    try {
      ProductReviewComment::firstWhere("id", $id)->delete();
    } catch (\Exception $e) {
      return response()->json([
        "error" => $e->getMessage()
      ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    return response()->json([
      "message" => "Comment has been deleted."
    ], Response::HTTP_OK);
  }
}
