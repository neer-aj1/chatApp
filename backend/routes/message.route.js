import express from 'express';
import privateRoute from '../middleware/protectedRoute.js';
import { getMessage, sendMessage } from '../controllers/message.controller.js';


const router = express.Router();

router.get("/:id", privateRoute, getMessage);
router.post("/send/:id", privateRoute, sendMessage);

export default router;