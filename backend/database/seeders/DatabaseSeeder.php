<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Address;
use App\Models\Product;
use App\Models\ProductRating;
use App\Models\ProductReview;
use App\Models\ProductReviewComment;
use App\Models\Verification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class DatabaseSeeder extends Seeder {
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run() {
    // \App\Models\User::factory(30)->create();

    // \App\Models\User::factory()->create([
    //     'first_name' => 'Wendy',
    //     'last_name' => 'Yanto',
    //     'full_name' => 'Wendy Yanto',
    //     'email' => 'test@example.com',
    // ]);

    User::create([
      "first_name" => "Atras",
      "last_name" => "Shalhan",
      "full_name" => "Atras Shalhan",
      "username" => "beowulf",
      "email" => "atrasshalhan@gmail.com",
      "password" => Hash::make("testing12345"),
      "phone_number" => "081287318166",
      "peach_coin" => 500000,
      "address" => "Kota Sutera, Blossom Ville c7/20"
    ]);

    User::create([
      "first_name" => "Kelsha",
      "last_name" => "Aira Meylie",
      "full_name" => "Kelsha Aira Meylie",
      "username" => "ludovica",
      "email" => "kelshairaa@gmail.com",
      "password" => Hash::make("testing12345"),
      "phone_number" => "0812873846577",
      "peach_coin" => 500000,
      "address" => "Tegal Alur 1"
    ]);

    Product::create([
      "img_link" => "oppo-reno.jpg",
      "title" => "Oppo Reno 4 8/128",
      "description" => "OPPO RENO 4F 8/128 GB.

Dijual sebuah handphone OPPO RENO 4F 8/128 GB, Dengan kelengkapan dan kondisi sebagai berikut :

Kelengkapan :

Unit Handphone dan Baterai, Charger, Headset, Kabel Data, Dusbook beserta buku - buku panduan, kartu garansi.

Kondisi :

OPPO RENO 4F 8/128 GB.

• Fullset Garansi OPPO resmi indonesia.
• Ada harga, ada kualitas pemakean.
• Ram 8/128 GB.
• Mulus
• Performa Dll NO MINUS. 
• Kamera? Jangan Ditanya Gan.
• Semua kelengkapan diatas masih original semua.
• Baterai masih awet (normal) tidak ngedrop.
• OS android.
• Garansi personal 1 Minggu setelah barang di terima jika jatuh, kena air dan di bongkar garansi void.
• Fungsi Normal tidak ada trouble.

Status Barang :
    1. Garansi Resmi Indonesia
    2.1 MINGGU( di hitung dari sejak barng di terima )
    3.Garansi Software sepenuhnya bisa di laku kan di service center terdekat
    4.Tidak sesuai barang boleh retur/kembalikan barang
    5.Jangan lupa bintang dan ulasannya.

Membeli berarti telah setuju dengan
diskripsinya",
      "price" => 3200000,
      "discount" => 0,
      "total_sales" => 8,
      "stock" => 12,
      "user_id" => 1,
      "location" => "Tangerang Kota"
    ]);

    Product::create([
      "img_link" => "bardi-lamp.jpg",
      "title" => "LED Bulb 7W ECO, Putih - MEVAL",
      "description" => "- Ready gojek/grab 7hari termasuk hari libur selalu kirim
- Distributor Resmi - Ga perlu kawatir
- Garansi Resmi 1 Thn (Sesuai invoice Tokopedia)
- Barang Original Bardi (BNIB) Brand New in Box
- Jika ada kerusakan / klaim garansi bisa langsung ke Bardi (Ongkir klaim ditanggung pembeli sepenuhnya)


BARDI SMART LIGHT BULB adalah lampu yang di kontrol oleh aplikasi via wifi.
Produk [BARDI] sangat cocok dengan Google Home & Amazon Alexa & Siri melalui aplikasi Bardi Smart Home
(download free on playstore / app store)

Features:
1) Wireless WiFi control
2) 2700 - 6500 kelvin (warm-cool white)
3) 16 million color light
4) Timing, delay switch
5) Multiple scenarios
6) Support Alexa Echo & Google home
7) Support Siri & Google Assist from HP
8) Can be controlled by multiple user
9) 12W = 1110Lumens

Spesifikasi :
Lumens : 1110 Lm
Power : 12 watt
WIFI : IEEE 802.11 b/g/n 2.4GHz
Sistem Suport : IOS & Android OS
Dimensi : 70 x 70 x 115mm
Berat : 180gr
Voltase : 240Volt 60Hz
Masa Pakai : 50.000 jam

-------------

Produk ini sering di gunakan untuk:

Lampu kamar yang dapat di redupkan hingga 111 lumens jadi lampu tidur dan di terangkan hingga 1110 lumens sesuai alarm bangun yang sudah di skedulkan

Lampu ruang makan yang dapat di buat kuning hingga 2700K jadi lampu makan dan di atur putih hingga 6500K jadi lampu belajar/kerja

Lampu ruang main/hobby/karaoke yang dapat di buat kombinasi hingga 16jt RGB

Lampu balkon yang dapat di skedul mati nyala sesuai kebiasaan dan juga bisa di kendalikan dari jarak jauh agar terkesan ada orang di rumah selagi liburan keluar negeri",
      "price" => 20000,
      "discount" => 5,
      "total_sales" => 256,
      "stock" => 4804,
      "user_id" => 1,
      "location" => "Jakarta Barat"
    ]);

    Product::create([
      "img_link" => "kuromi.jpg",
      "title" => "Cute Kuromi My Melody KT Plush Toy Pendant Cinnamoroll Stuffed Doll",
      "description" => "Gantungan kunci ori
ukuran : 4 x 6 cm

Ready:
HK
MM
KRM
CN",
      "price" => 163200,
      "discount" => 0,
      "total_sales" => 1,
      "stock" => 8458,
      "user_id" => 2,
      "location" => "Bogor"
    ]);

    Product::create([
      "img_link" => "chamelleon.jpg",
      "title" => "XIA| 28inch Simulated Chameleon Animal Model Doll Plush Stuffed Toy",
      "description" => "1KG BISA 5PCS
BERAT PRODUK 260Gram

FITUR LED : LED+JOGET+RECORD+LAGU
FITUR NON : JOGET + LAGU

Semua LAGU Bahasa english bukan mandarin dan ini type Baterai.

Fitur:

* 100% brand new dan kualitas tinggi.
* Mainan itu bisa menari, bernyanyi, bergerak, berbalik dan Merekam Suara.
* Ini bagus untuk pendidikan awal. mainan akan menari dengan ritme, menarik perhatian anak-anak.
* Mainan akan menari selama beberapa jam, memberikan waktu yang menyenangkan bagi anak seumur hidup.
* Hadiah ulang tahun Natal terbaik untuk anak-anak. Musik dan tarian ceria sangat cocok untuk menciptakan suasana yang menyenangkan dan cocok untuk pesta.


Spesifikasi:

* Nama ： Kaktus Menari + Bisa Rekam Suara
* Ukuran: 12.6 \"/0.21KG
* Jenis: Putar 、 Putar tubuh
* Bahan: Mewah
* Dancing Cactus System Baterai
* Perhatian: Jangan dicuci

Isi Paket :
1 * Boneka Kaktus",
      "price" => 242307,
      "discount" => 20,
      "total_sales" => 1,
      "stock" => 998,
      "user_id" => 2,
      "location" => "Jambi"
    ]);

    Product::create([
      "img_link" => "mikhadou.jpg",
      "title" => "Mikhadou Doudou Doll (boneka anak)",
      "description" => "Mikhadou Doudou Doll (boneka anak , boneka bunny, boneka teddy)",
      "price" => 124000,
      "discount" => 0,
      "total_sales" => 0,
      "stock" => 24,
      "user_id" => 2,
      "location" => "Sulawesi"
    ]);

    Product::create([
      "img_link" => "baju-pink.jpg",
      "title" => "Cherry Blossom Pink One Set / ff183",
      "description" => "READY STOK ... LANGSUNG ORDER YA KAKAK..
PENGIRIMAN SETIAP HARI

Setelan Tie Dye Bahan Combed 30s halus dan lembut pastinya!!

Detail Ukuran :

Ukuran Baju
Lingkar Dada : 110cm
Panjang Baju : 65cm

Ukuran Celana
Lingkar Celana : 65cm - 100cm mengunakan karet

Detail ukuran bisa dilihat pada masing-masing gambar.

Tulis warna di catatan, berikan warna cadangan agar mempercepat proses pengiriman. 😊


NOTE PENTING/MOHON DIBACA :
- Cara Beli Lebih Dari 1 Produk Beda Model...
- Pilih Dan Masukan Model/Variasi Produk Ke Dalam Troli Satu Persatu Dulu, Kalau Sudah Lengkap Semua Tinggal Buat Pesanan.

-> Untuk mengetahui ketersedian BARANG, silahkan klik kolom Variasi. Jika bisa di klik artinya READY, jika tidak bisa di klik artinya KOSONG.
-> Mohon diorder sesuai varian produk yg tersedia.Karena orderan kami proses sesuai variasi yang dipilih.

Yok buruan diorder sebelum kehabisan!!

Happy shoping 🎁🎉🥳😍",
      "price" => 375000,
      "discount" => 0,
      "total_sales" => 0,
      "stock" => 17,
      "user_id" => 2,
      "location" => "Unknown"
    ]);

    Product::create([
      "img_link" => "smiski.jpg",
      "title" => "Smiski Bed Series [Blind Box]",
      "description" => "Kids & Beyond hadir untuk menyediakan produk edukasi yang berkualitas bagi anak-anak dan kami hanya menjual produk original.
Follow kami agar jangan ketinggalan promosi menarik dari kami dan jangan lupa checkout setiap hari untuk new titles and diskon serta voucher ya!",
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

    ProductReviewComment::create([
      "product_review_id" => 1,
      "user_id" => 2,
      "comment" => "terimakasih, sangat membantu reviewnya"
    ]);

    Verification::create([
      "about" => "Email Verification",
      "user_id" => "1",
      "token" => Uuid::uuid4(),
      "expires" => now()->addMinutes(15)
    ]);
  }
}
