import { Router } from 'express';
import { register, login, forgetPassword, logout } from '../controllers/authController';

const user = Router();

user.post('/register', register);
user.post('/login', login);
user.post('/forget-password', forgetPassword);
user.post('/logout', logout);

export default user;