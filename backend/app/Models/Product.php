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

  public function owner() {
    return $this->belongsTo(User::class);
  }

  public function reviews() {
    return $this->hasMany(ProductReview::class);
  }

  public function getAverageRating() {
    return number_format($this->reviews()->where("product_id", $this->id)->pluck("rating")->avg(), 1);
  }

  public function getTotalReviews() {
    return $this->reviews()->get()->count();
  }
}
