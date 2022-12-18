import express from "express"
import { createEvent, delEvent, getDetailEvent, getEventQuery, updateEvent } from "../controller/EventController.js";
import { validation } from "../middleware/Validation.js";

const eventRouter = express.Router();

eventRouter.post('/event',validation, createEvent);
eventRouter.delete('/event', validation, delEvent);
eventRouter.patch('/event', validation, updateEvent);

eventRouter.get('/event/detail', getDetailEvent);
eventRouter.get('/event', getEventQuery);

eventRouter.use((req, res) => {
    res.status(404).json({message : "404"})
})

export default eventRouter;