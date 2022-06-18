<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
  use HasFactory;

  protected $guarded = [
    "id",
    "created_at",
    "updated_at"
  ];

  public function owner() {
    return $this->belongsTo(User::class);
  }

  public function ratings() {
    return $this->hasMany(ProductRating::class);
  }

  public function reviews() {
    return $this->hasMany(ProductReview::class);
  }

  public function getAverageRating() {
    return $this->ratings();
  }
}
