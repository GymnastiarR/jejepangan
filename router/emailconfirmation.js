import express from "express";
import { sendMail, verifyEmail } from "../controller/emailVerificationController.js";
import { isUserNotLogin } from "../middleware/pageValidation.js";

const emailRouter = express.Router();

emailRouter.use(['/resend', '/verify'],isUserNotLogin);

//return page to resend email

//send email confirmation to user
emailRouter.post('/resend/', sendMail);

//validation signature
emailRouter.get('/verify', verifyEmail);


export default emailRouter;