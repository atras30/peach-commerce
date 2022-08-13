<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class ProductReviewComment extends Model {
  use HasFactory;

  protected $guarded = [
    "id",
    "created_at",
    "updated_at",
  ];

  protected $with = [
    "user"
  ];

  public function user() {
    return $this->belongsTo(User::class);
  }
}