Tentang project ini

Project ini dibuat sebagai backend untuk apliksi jejepangan.

Cara setup project

1. jalankan perintah berikut untuk melakukan installasi dependencies di package.json

```npm install```

2. aktifkan web server seperti apache dan DBMS seperti mysql
4. buat file .env atau gunakan .example-env untuk melakukan setting variable

```APP_URL=https://localhost:5000 
PRIVATE_KEY=dkafjkdfjlkjadflkjakdfjkl375487389cvb39284
EMAIL_KEY=adkfjladjf392489823940\3248??><>?87583?shdfjAPP_PORT=5000
DATABASE_URL="mysql://root:@localhost:3306/jejepangan"
PASS_EMAIL=345f99a1a5a9ae```

6. sesuaikan database url yang ada pada .env
7. sesuaikan juga dbms yang digunakan pada file schema.prisma
8. jalankan perintah npx prisma migrate dev untuk membuat table di database
9. gunakan test.rest untuk mencoba mengakses end point. Bisa juga menggunakan postman dan yang lainnya
10. masukkan semua file unit test ke dalam folder test

NOTE
1. command lainnya tentang prisma dapat dilihat di : 
2. method lainnya yang ada pada validator dapat dilihat di : 
3. methid lainnya yang ada pada jwt dapat dilihat di : 
4. method lainnya yang ada pada bcrypt dapat dilihat di : 
5. method lainnya yang ada pada parse-cookie dapat dilihat di : 
6. method lainnya yang ada pada jest : 
