import { send } from "../services/email/emailGenerator.js";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
import dotenv from "dotenv";

export const sendMail = async (req, res) => {
    const userEmail = req.body.email;
    try {
        const {verified, ...user} = await isEmailExists(userEmail);
        if(!user) throw new Error("Email belum pernah terdaftar");
        if(verified) throw new Error("Email sudah pernah diverifikasi");
        res.status(200).json({message:"Email Berhasil Dikirimkan"});
        send(user).catch(console.error());
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const token = req.query.token;
        const {email, exp} = jwt.verify(token, process.env.EMAIL_KEY);

        if(!email) throw new Error("Token Tidak Valid");

        await prisma.user.update({
            where : {
                email
            },
            data : {
                verified : true
            },
        })
        res.status(200).json({message : "Email Sudah Terverifikasi"});
    } catch (error) {
        res.status(400).json( {message : error.message} );
    }
}

async function isEmailExists (email){
    try {        
        const user = await prisma.user.findFirstOrThrow({
            where : {
                email
            },
            select : {
                email : true,
                name : true,
                verified : true
            }
        })
        return user
    } catch (error) {
        return {};
    }
}