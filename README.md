# peach-commerce


## Product API Documentation

### /api/products/search - GET
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