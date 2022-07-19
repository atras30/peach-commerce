<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition() {
    $firstName = $this->faker->firstName('male');
    $lastName = $this->faker->lastName();
    $fullName = "{$firstName} {$lastName}";
    
    $user = [
      'first_name' => $firstName,
      'last_name' => $lastName,
      'full_name' => $fullName,
      'username' => $this->faker->userName(),
      'email' => $this->faker->unique()->safeEmail(),
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'phone_number' => $this->faker->phoneNumber(),
      'peach_coin' => $this->faker->numberBetween(0, 1000000),
      'address' => $this->faker->address(),
      'remember_token' => Str::random(10),
    ];
    
    return $user;
      /*
        "first_name" => "Atras",
        "last_name" => "Shalhan",
        "full_name" => "Atras Shalhan",
        "username" => "beowulf",
        "email" => "atrasshalhan@gmail.com",
        "password" => Hash::make("testing12345"),
        "phone_number" => "081287318166",
        "peach_coin" => 500000,
        "address" => "Kota Sutera, Blossom Ville c7/20"
      */
  }

  /**
   * Indicate that the model's email address should be unverified.
   *
   * @return static
   */
  public function unverified() {
    return $this->state(function (array $attributes) {
      return [
        'email_verified_at' => null,
      ];
    });
  }
}
