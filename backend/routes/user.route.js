import express from 'express';
import privateRoute from '../middleware/protectedRoute.js';
import { getUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/",privateRoute, getUsers);

export default router;