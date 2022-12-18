import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerRouter from "./router/register.js";
import emailRouter from "./router/emailconfirmation.js";
import loginRouter from "./router/login.js";
import eventRouter from "./router/Event.js";
import cookieParser from "cookie-parser";
import landingRouter from "./router/LandingPage.js";
dotenv.config()

const app = express();
app.use(cookieParser('Gymnas'));
app.use(cors());
app.use(express.json());
app.use(registerRouter);
app.use(emailRouter);
app.use(landingRouter);
app.use(loginRouter);
app.use(eventRouter);


export default app;
