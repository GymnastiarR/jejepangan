import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findMany()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({"msg" : "Error"})
    }
}

export const getUserbyId = async (req, res) => {
    try {
        const user = await prisma.user.findUniqueOrThrow()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({"msg" : "Error"})   
    }
}

export const updateUser = async (req, res) => {
    const {name, password, passwordConfirmation} = req.body;
    try {
        
    } catch (error) {
        
    }
}

// export default {getUser, getUserbyId}