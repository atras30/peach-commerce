<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Verification;
use App\Models\Product;
use Ramsey\Uuid\Uuid;
use App\Mail\EmailVerification;
use Illuminate\Support\Facades\Mail;

class User extends Authenticatable {
  use HasApiTokens, HasFactory, Notifiable;

  protected $guarded = [
    'id',
    'created_at',
    'updated_at'
  ];

  public function products() {
    return $this->hasMany(Product::class);
  }

  public function verifications() {
    return $this->hasMany(Verification::class);
  }

  public function shopping_carts() {
    return $this->hasMany(ShoppingCart::class);
  }

  public function generateEmailVerificationToken() {
    $token = Verification::create([
      "about" => "Email Verification",
      "user_id" => $this->id,
      "token" => Uuid::uuid4(),
      "expires" => now()->addMinutes(15)
    ]);

    $this->email_verification_token = $token->token;

    Mail::to($this->email)->send(new EmailVerification($this));

    return $this;
  }
}
