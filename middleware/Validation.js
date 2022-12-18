import cookieParser, { JSONCookie, signedCookies } from "cookie-parser";
import express from "express"
import jwt from "jsonwebtoken"

export const validation = (req, res, next)=>{
    const token = req.signedCookies['Auth-Token']

    if(!token) {res.status(400).json({mesaage : "Invalid Token"}); return};
    try {
        const {id, ip} = jwt.verify(token, process.env.PRIVATE_KEY);
        if(!id) throw new Error("Token Tidak Valid")
        if(!(req.socket.remoteAddress == ip)) throw new Error("Token Invalid");
        req.body.id = id;
        next();
    } catch (error) {
        res.status(400).clearCookie('Auth-Token').json({message : error.message}).end();
    }
}