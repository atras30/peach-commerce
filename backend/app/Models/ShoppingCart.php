<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model {
  use HasFactory;

  protected $guarded = [
    "id",
    "created_at",
    "updated_at"
  ];

  protected $with = ["product"];

  public function user() {
    return $this->belongsTo(User::class);
  }

  public function product() {
    return $this->belongsTo(Product::class);
  }
}
