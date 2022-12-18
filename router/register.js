import express from "express"
import { registerUser } from "../controller/RegisterController.js";
import { isUserNotLogin } from "../middleware/pageValidation.js";
import { fieldValidation, existsValidation } from "../middleware/registerValidation.js";

const registerRouter = express.Router();

/*
    Register middleware yang akan digunakan sebelum request handler
**/
registerRouter.use('/register', isUserNotLogin);
registerRouter.post('/register', fieldValidation);
registerRouter.post('/register', existsValidation);

/*
    Register request handler
*/
registerRouter.post('/register', registerUser);
registerRouter.get('/register', (req, res) => {
    try {
        res.status(200).json({message : "OK"});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

export default registerRouter;