import express from 'express';
import { getAllUser, login, signup } from '../controllers/user-controller.js';

const router = express.Router();

router.get("/",getAllUser)   //get user
router.post("/signup",signup) //singup
router.post("/login",login) //login user

export default router