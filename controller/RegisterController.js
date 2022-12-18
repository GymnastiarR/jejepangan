import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { send } from "../services/email/emailGenerator.js";

export const registerUser = async (req, res) => {
    const {name, email, username, password} = req.body;
    try {
        const newUser = await prisma.user.create({
            data : {
                name,
                email,
                password,
                username,
            }
        });
        send(newUser);
        res.status(200).json({message : "Berhasil membuat akun", data : newUser});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


