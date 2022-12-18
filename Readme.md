## About this project

Project ini dibuat sebagai backend untuk apliksi jejepangan.

Cara setup project

1. jalankan perintah berikut untuk melakukan installasi dependencies di package.json

```js
$ npm install
```

2. aktifkan web server seperti apache dan DBMS seperti mysql
4. buat file .env atau gunakan .example-env untuk melakukan setting variable

```js
# Aplikasi URL sesuaikan
APP_URL=https://localhost:5000 
# private key untuk JWT. UBAH.
PRIVATE_KEY=dkafjkdfjlkjadflkjakdfjkl375487389cvb39284
# private key untuk JWT verifikasi email
EMAIL_KEY=adkfjladjf392489823940\3248??><>?87583?shdfj
# sesuaikan port
APP_PORT=5000
# sesuaikan database
DATABASE_URL="mysql://root:@localhost:3306/jejepangan"
# password email. sesuaikan jangan pake akun mailtrap saya
PASS_EMAIL=345f99a1a5a9ae
```

7. sesuaikan juga dbms yang digunakan pada file schema.prisma

8. jalankan perintah berikut untuk membuat table di database
```js
$ npx prisma migrate dev
```
9. gunakan test.rest untuk mencoba mengakses end point. Bisa juga menggunakan postman dan yang lainnya
10. masukkan semua file unit test ke dalam folder test

NOTE
1. command lainnya tentang prisma dapat dilihat di : 
2. method lainnya yang ada pada validator dapat dilihat di : 
3. methid lainnya yang ada pada jwt dapat dilihat di : 
4. method lainnya yang ada pada bcrypt dapat dilihat di : 
5. method lainnya yang ada pada parse-cookie dapat dilihat di : 
6. method lainnya yang ada pada jest : 
