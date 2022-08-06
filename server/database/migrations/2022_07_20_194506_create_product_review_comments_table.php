<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('product_review_comments', function (Blueprint $table) {
      $table->id();
      $table->foreignId("user_id")->constrained("users")->onUpdate("cascade")->onDelete("cascade");
      $table->foreignId("product_review_id")->constrained("product_reviews")->onUpdate("cascade")->onDelete("cascade");
      $table->text("comment");
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('product_review_comments');
  }
};
