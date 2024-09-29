import {Router} from 'express';
import {getUserinfo, login, signup} from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';


const authRoutes = Router();

authRoutes.post('/signup',signup);
authRoutes.post('/login',login);
authRoutes.get('/user-info',verifyToken,getUserinfo);

export default authRoutes;