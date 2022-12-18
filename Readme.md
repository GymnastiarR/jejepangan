Tentang project ini

Project ini dibuat sebagai backend untuk apliksi jejepangan.

Cara setup project

1. jalankan perintah npm install untuk melakukan installasi depedencies di package.json
2. aktifkan web server seperti apache dan DBMS seperti mysql
3. buat file .env atau gunakan .example.env untuk melakukan setting variable
4. sesuaikan database url yang ada pada .env
5. sesuaikan juga dbms yang digunakan pada file schema.prisma
6. jalankan perintah npx prisma migrate dev untuk membuat table di database
7. gunakan test.rest untuk mencoba mengakses end point. Bisa juga menggunakan postman dan yang lainnya
8. masukkan semua file unit test ke dalam folder test

NOTE
1. command lainnya tentang prisma dapat dilihat di : 
2. method lainnya yang ada pada validator dapat dilihat di : 
3. methid lainnya yang ada pada jwt dapat dilihat di : 
4. method lainnya yang ada pada bcrypt dapat dilihat di : 
5. method lainnya yang ada pada parse-cookie dapat dilihat di : 
6. method lainnya yang ada pada jest : 