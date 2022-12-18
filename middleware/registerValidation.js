// import validator from "validator";
import validator from 'validator'
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const fieldValidation = (req, res, next) => {
    const {name, email, username, password, passwordConfirmation} = req.body;
    try {     
        if(!validator.isAlpha(name, 'en-US', {ignore : " "}) || !validator.isLength(name, {min : 7, max : undefined})) throw "Nama hanya dapat berisi huruf dengan minimal 7 karakter";
        if(!validator.isEmail(email)) throw "Format email salah";
        if(!validator.isAlphanumeric(username) || !validator.isLength(username, {min : 7, max : undefined})) throw "Username hanya dapat mengandung huruf dan angka dengan minimal 7 karakter";
        if(!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)) throw "Password harus mengandung a, A, 1";
        if(!validator.isLength(password, {min:8, max:undefined})) throw "Password harus mengandung lebih dari 8 karakter";
        if(passwordConfirmation !== password) throw "Password tidak sama";
        next();
    } catch (error) {
        res.status(400).json({message : error})
        return;
    }
}

export const existsValidation = async (req, res, next) => {
    const {email, username, password} = req.body;
    try {
        let user = await prisma.user.findFirst({where : {email}})
        if(user) throw new Error("Email sudah terdaftar")

        user = await prisma.user.findFirst({where : {username}})
        if(user) throw new Error("Username sudah digunakan");

        const hashPassword = bcrypt.hash(password, 10);
        await hashPassword.then( (result) => {
            req.body.password = result;
        })

        next();
    } catch (error) {
        res.status(400).json({message : error.message});
    }
}



