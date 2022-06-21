<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Address;
use App\Models\Product;
use App\Models\ProductRating;
use App\Models\ProductReview;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder {
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run() {
    // \App\Models\User::factory(10)->create();

    // \App\Models\User::factory()->create([
    //     'name' => 'Test User',
    //     'email' => 'test@example.com',
    // ]);

    User::create([
      "first_name" => "Atras",
      "last_name" => "Shalhan",
      "full_name" => "Atras Shalhan",
      "username" => "beowulf",
      "email" => "atrasshalhan@gmail.com",
      "password" => "testing12345",
      "phone_number" => "081287318166",
      "peach_coin" => 500000
    ]);

    User::create([
      "first_name" => "Kelsha",
      "last_name" => "Aira Meylie",
      "full_name" => "Kelsha Aira Meylie",
      "username" => "ludovica",
      "email" => "kelshairaa@gmail.com",
      "password" => "testing12345",
      "phone_number" => "0812873846577",
      "peach_coin" => 500000
    ]);

    Address::create([
      "user_id" => 1,
      "address" => "Villa Mutiara Pluit C5/14"
    ]);

    Address::create([
      "user_id" => 1,
      "address" => "Kota Sutera, Blossom Ville c7/20"
    ]);

    Address::create([
      "user_id" => 2,
      "address" => "Tegal Alur 1"
    ]);

    Address::create([
      "user_id" => 2,
      "address" => "Tegal Alur 2"
    ]);

    Product::create([
      "title" => "Oppo Reno 4 8/128",
      "price" => 3200000,
      "discount" => 0,
      "total_sales" => 8,
      "stock" => 12,
      "user_id" => 1,
      "location" => "Tangerang Kota"
    ]);

    Product::create([
      "title" => "LED Bulb 7W ECO, Putih - MEVAL",
      "price" => 20000,
      "discount" => 5,
      "total_sales" => 256,
      "stock" => 4804,
      "user_id" => 1,
      "location" => "Jakarta Barat"
    ]);

    Product::create([
      "title" => "Cute Kuromi My Melody KT Plush Toy Pendant Cinnamoroll Stuffed Doll",
      "price" => 163200,
      "discount" => 0,
      "total_sales" => 1,
      "stock" => 8458,
      "user_id" => 2,
      "location" => "Bogor"
    ]);

    Product::create([
      "title" => "XIA| 28inch Simulated Chameleon Animal Model Doll Plush Stuffed Toy",
      "price" => 242307,
      "discount" => 20,
      "total_sales" => 1,
      "stock" => 998,
      "user_id" => 2,
      "location" => "Jambi"
    ]);

    Product::create([
      "title" => "Mikhadou Doudou Doll (boneka anak)",
      "price" => 124000,
      "discount" => 0,
      "total_sales" => 0,
      "stock" => 24,
      "user_id" => 2,
      "location" => "Sulawesi"
    ]);

    Product::create([
      "title" => "Cherry Blossom Pink One Set / ff183",
      "price" => 375000,
      "discount" => 0,
      "total_sales" => 0,
      "stock" => 17,
      "user_id" => 2,
      "location" => "Unknown"
    ]);

    Product::create([
      "title" => "Smiski Bed Series [Blind Box]",
      "price" => 129000,
      "discount" => 0,
      "total_sales" => 0,
      "stock" => 7,
      "user_id" => 2,
      "location" => "Jakarta Selatan"
    ]);

    ProductReview::create([
      "user_id" => 2,
      "product_id" => 1,
      "review" => "Product ini sangat bagus",
      "rating" => 5
    ]);

    ProductReview::create([
      "user_id" => 1,
      "product_id" => 1,
      "review" => "Produk Sesuai",
      "rating" => 4
    ]);

    ProductReview::create([
      "user_id" => 2,
      "product_id" => 2,
      "review" => "",
      "rating" => 4
    ]);

    ProductReview::create([
      "user_id" => 2,
      "product_id" => 1,
      "review" => "",
      "rating" => 2
    ]);
  }
}
