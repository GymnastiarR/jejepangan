import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
dotenv.config();

const prisma = new PrismaClient();

export const loginValidation = async (req, res)=>{
    const {username, password} = req.body;
    try {
        if(validator.isEmpty(username) || validator.isEmpty(password)) throw new Error("Usename dan password tidak boleh kosong")
        const {password : dbPassword, verified, id} = await prisma.user.findFirst({
            where:{username},
            select:{password : true, verified : true, id : true}
        }) || {}

        if(!dbPassword) throw new Error("Username atau Password Salah");

        const valid = await compare(password, dbPassword);

        if(!valid) throw new Error("Username atau Password Salah");
        if(!verified) throw new Error("Email belum diverfikasi");
        const ip = req.socket.remoteAddress;

        const token = jwt.sign({id, ip}, process.env.PRIVATE_KEY, {expiresIn : "12h"});
        res.status(200).cookie('Auth-Token', token, { signed: true }).json({message : "Login Success"})

    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('Auth-Token').status(200).json({message : 'Logout Success'});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}
