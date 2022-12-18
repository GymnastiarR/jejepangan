import jwt from "jsonwebtoken";

const tokenValidate = (req) => {
    const token = req.signedCookies['Auth-Token']
    if(!token) return false;
    
    // console.log("here");
    jwt.verify(token, process.env.PRIVATE_KEY, function(err, decoded) {
        if(err) {
            let expiredAt = new Date(err.expiredAt)
            if(expiredAt.getTime() < Date.now()) return false;
            throw err
        }
    });      

    return true
}

export const isUserLogin = (req, res, next) => {
    try {        
        if(!tokenValidate()) throw new Error("Token tidak valid");
        next()
    }catch (error) {
        res.status(400).json({message : error.message});
    }
}

export const isUserNotLogin = (req, res, next) => {
    try {       
        if(tokenValidate(req)) throw new Error("User sudah login");
        next()
    }catch (error) {
        res.status(400).json({message : error.message});
    }
}


