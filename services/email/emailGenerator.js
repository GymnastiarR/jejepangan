import nodemailer from "nodemailer";
import {readFile, writeFile} from "node:fs/promises";
import jwt from 'jsonwebtoken';

export const send = async function({name, email}) {
    let testAccount = await nodemailer.createTestAccount();
  
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c8f0626a5b3ab8",
          pass: "345f99a1a5a9ae"
        }
      });

    let info = await transporter.sendMail(createBodyEmail(name, email));

  }

  function createBodyEmail(name, email){

    const token = jwt.sign({name, email}, process.env.EMAIL_KEY, { expiresIn : '1h'});

    return {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "Verifikasi Email Anda", // Subject line
      text: "Hello world?", // plain text body
      html: 
      `
      <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <link href="style.css" rel="stylesheet" type="text/css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Archivo:wght@300&family=Lato:wght@300&family=Poppins:wght@400;500&family=Roboto:wght@500&display=swap"
    rel="stylesheet">
  <style>
    body {
      background-color: #F5F5F5F5;
    }

    section {
      width: 95%;
      margin: 0 auto;
      background-color: white;
      padding: 10px 20px;
      box-sizing: border-box;
    }

    h1 {
      text-align: center;
      font-family: Poppins;
    }

    p,
    a {
      font-family: Poppins;
      font-size: 14px;
      line-height: 28px;
      word-wrap: break-word;
    }

    .desc {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    div.button {
      display: flex;
      justify-content: center;
    }

    .button>a {
      display: flex;
      text-decoration: none;
      width: 140px;
      height: 50px;
      border-radius: 5px;
      border: none;
      color: white;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      background-color: blue;
      font-family: Poppins;
      letter-spacing: 1px;
    }


    @media screen and (min-width : 768px) {
      section {
        width: 70%;
      }
    }

    @media screen and (min-width : 810px) {
      section {
        width: 50%;
      }
  </style>
</head>

<body>
  <div class="container">
    <h1>Hello!!</h1>
    <section>
      <p class="desc">Kami Senang Kamu Mendaftar</p>
      <p>Klik tombol dibawah untuk verifikasi email kamu</p>
      <div class="button">
        <a href="http://localhost:5000/verify?token=${token}">Verifikasi Email</a>
      </div>
      <p>
        Jika kamu merasa tidak melakukan pendaftaran pada aplikasi jejepangan kamu dapat mengabaikan email ini.
      </p>
      <p>
        Kami mengucapkan terima kasih banyak.
      </p>
      <hr>
      <div style=" margin-top:20px;">
          <p>Jika tombol error, silahkan gunakan link berikut.</p>
          <a href="http://localhost:5000/verify?token=${token}">http://localhost:5000/verify?token=${token}</a>
      </div>
    </section>
  </div>
</body>

</html>
      `
    }
  }
  



