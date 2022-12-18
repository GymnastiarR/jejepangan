import express from "express";
import { loginValidation, logout } from "../controller/LoginController.js";
import { isUserNotLogin } from "../middleware/pageValidation.js";
import { validation } from "../middleware/Validation.js";

const loginRouter = express.Router();

loginRouter.get('/login', isUserNotLogin, (req, res) => {
    try {
        res.status(200).send({message : "OK"})
    } catch (error) {
        res.status(500).send({message : error.message})
    }
});

loginRouter.post('/login', isUserNotLogin,loginValidation);
loginRouter.get('/logout', validation ,logout);

export default loginRouter;