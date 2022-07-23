<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
  use HasFactory;

  protected $guarded = [
    "id",
    "created_at",
    "updated_at",
    "total_sales"
  ];

  protected $with = ["owner"];

  public function owner() {
    return $this->belongsTo(User::class, "user_id");
  }

  public function reviews() {
    return $this->hasMany(ProductReview::class);
  }

  public function shopping_carts() {
    return $this->hasMany(ShoppingCart::class);
  }
}
