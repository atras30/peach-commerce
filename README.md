# peach-commerce

Website : https://peachcommerce.masuk.id

## Peach Commerce itu apa ?
Website Aplikasi iseng yang merepresentasikan sebuah e-commerce (situs jual beli online) yang dibuat dengan teknologi Laravel (Backend) dan React (Frontend) yang mengimplementasikan berbagai fitur yang ada di e-commerce pada umumnya.

## How to start the project ?
1. Setting .env file di backend, ada file .env.example disitu, rename jadi .env kemudian sesuaikan settingannya.

2. setting database, bikin database baru sesuai dengan .env anda (default db : peach_commerce)

3. buka terminal arahin ke folder backend, ketik perintah ini :
- php artisan migrate:fresh --seed (untuk melakukan migrasi database)
- php artisan serve

4. install dependencies & modules jika belum ada di local kalian, caranya : \
dependencies backend -> buka terminal dan arahin ke folder backend lalu ketik "composer install"\
dependencies frontend -> buka terminal dan arahin ke folder frontend lalu ketik "npm install"

5. jalankan di local server, ketikan perintah berikut :\
local server backend (Laravel) -> buka terminal dan arahin ke folder backend lalu ketik "php artisan serve"\
local server frontend (React) -> buka terminal dan arahin ke folder backend lalu ketik "npm start"

6. buka browser, akses url : http://localhost:3000 (local server react)

## Product API Documentation

### /api/products/search/{filter} - GET
Menampilkan data berdasarkan filter input user

### /api/products - GET
Menampilkan semua data product

response status : 200 - OK

returned response : 
"message" => "Successfully fetched data",\
"products" => $products (array of object)

### /api/products/{id} - GET
Menampilkan semua data product berdasarkan ID

response status : 200 - OK

returned response :\
"message" => "Sucessfully fetched one product",\
"product" => $product (object)

### /api/products - POST
Membuat product dengan attribut wajib : *{title, discount, price, user_id, stock}*

#### Attribut Rules : 
title : tidak boleh kosong\
discount : tidak boleh kosong, harus integer, diantara 0-100\
price : tidak boleh kosong, integer, nilai minimal 0\
user_id : tidak boleh kosong\
stock : tidak boleh kosong, integer, nilai minimal 1

response status : 201 - CREATED

returned response :\
"message" => "Product was successfully created!",\
"product" => $product (object)

### /api/products/{id} - PUT
Update data product berdasarkan ID.\
data yang bisa diubah : *{title, discount, price, total_sales, stock}*

ketentuan data :

discount : harus integer, diantara 0-100 (tidak wajib ada)\
price : harus integer minimal 0          (tidak wajib ada)\
total_sales : harus integer minimal 0    (tidak wajib ada)\
stock : harus integer minimal 1          (tidak wajib ada)\

response status : 200 - OK

returned response :\
"message" => "Product was successfully updated",\
"product" => $product (object)

### /api/products/{id} - DELETE
Delete data product berdasarkan ID

response status : 200 - OK

returned response :\
"message": "Product was successfully deleted",\
"deleted_product": $product (object)

## User API Documentation

### /api/users - GET
Menampilkan semua data user

response status : 200 - OK

returned response : 
"message" => "Successfully fetched data",\
"users" => $users (array of object)

### /api/users/{id} - GET
Menampilkan semua data user berdasarkan ID

response status : 200 - OK

returned response :\
"message" => "Sucessfully fetched one user",\
"user" => $user (object)

### /api/users/{id} - GET
GET ONE USER

### /api/users/{id} - POST
CREATE ONE USER

### /api/users/{id} - PUT
EDIT ONE USER

### /api/users/{id} - delete
DELETE ONE USER
