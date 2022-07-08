<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductReview extends Model {
  use HasFactory;

  protected $with = ["user"];

  public function product() {
    return $this->belongsTo(Product::class, "product_id");
  }

  public function user() {
    return $this->belongsTo(User::class, "user_id");
  }
}
