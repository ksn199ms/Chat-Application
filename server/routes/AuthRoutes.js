import {Router} from 'express';
import {getUserinfo, login, signup, updateProfile, addProfileImage, deleteProfileImage} from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

import multer from "multer";

const upload = multer({dest:"uploads/profiles"});


const authRoutes = Router();

authRoutes.post('/signup',signup);
authRoutes.post('/login',login);
authRoutes.get('/user-info',verifyToken,getUserinfo);
authRoutes.post('/update-profile',verifyToken, updateProfile);
authRoutes.post('/add-profile-image',verifyToken, upload.single('profile-image'), addProfileImage);
authRoutes.delete('/delete-profile-image',verifyToken, deleteProfileImage);

export default authRoutes;