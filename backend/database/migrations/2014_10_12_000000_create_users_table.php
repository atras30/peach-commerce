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
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('first_name')->default("");
      $table->string('last_name')->nullable()->default("");
      $table->string('full_name')->default("");
      $table->string('username')->unique()->default("");
      $table->string('email')->unique()->default("");
      $table->string('email_verified_at')->nullable()->default(null);
      $table->string('address')->default("");
      $table->string('password')->default("");
      $table->string('phone_number')->nullable()->default("");
      $table->integer('peach_coin')->default(0);
      $table->rememberToken();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('users');
  }
};
