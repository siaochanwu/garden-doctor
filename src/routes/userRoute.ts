import { Router } from 'express';
import { register, login, forgetPassword, logout, resetPassword } from '../controllers/authController';

const user = Router();

user.post('/register', register);
user.post('/login', login);
user.post('/forget-password', forgetPassword);
user.put('/reset-password', resetPassword);
user.post('/logout', logout);


export default user;