import express from 'express';

const landingRouter = express.Router();

landingRouter.get('/', (req, res) => {
    res.status(200).json({message : "OK"})
})

export default landingRouter;