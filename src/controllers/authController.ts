import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import UserDTO from '../dtos/userDto';
import User from '../models/userModel';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
const { EMAIL_SERVICE_USER, EMAIL_SERVICE_PASSWORD } = process.env;
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';


export const register = async (req: Request, res: Response) => {
    const userDTO = plainToClass(UserDTO, req.body);
    const errors = await validate(userDTO);
    
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    
    const { username, password, email } = userDTO;
    // check if the user already exists
    const user = await User.findOne({ where: { email } });
    if (user) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, email } as User);
    res.status(201).send('User registered');
}

export const login = async (req: Request, res: Response) => {
    const userDTO = plainToClass(UserDTO, req.body);
    const errors = await validate(userDTO, { skipMissingProperties: true });

    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    const { email, password } = userDTO;
    const user = await User.findOne({ where: { email } });
    
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        return res.status(200).json({ token });
    } else if (user && !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Wrong password' });
    } else {
        return res.status(401).json({ message: 'User not found' });
    }
}

export const logout = (req: Request, res: Response) => {
    res.status(200).send('User logged out');
}

export const forgetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).send('User not found');
    }

    // Generate a temportary password
    const temporaryPassword = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
    await User.update({ password: hashedPassword }, { where: { email } });
    console.log('temporaryPassword', temporaryPassword, user.email)

    // Send the temporaryPassword to the user's email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_SERVICE_USER,
            pass: EMAIL_SERVICE_PASSWORD
        }
      });

      // dynamic html template
      const templatepPath = path.resolve(__dirname, 'src/views/mail.html');
      const templateSource = fs.readFileSync('src/views/mail.html', 'utf8');
      const template = handlebars.compile(templateSource);
      const htmlTemplate = template({ temporaryPassword, username: user.username});
    

      const mailOptions = {
        from: EMAIL_SERVICE_USER,
        to: user.email,
        subject: 'GreenDoctor App Password Reset',
        html: htmlTemplate
        // text: `Your temporary password is ${temporaryPassword}, It will expire in 10 minutes. Please change your password after login.`
      };

      transporter.sendMail(mailOptions, (error, info) =>{
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Email could not be sent'});
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ message: 'Password reset Email sent'})
        }
      })

}

export const resetPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'User not found'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update({ password: hashedPassword }, { where: { email } });
    res.status(200).json({ message: 'Password reset successful'});
}


// const createFakeUser = async () => {
//     try {
//         console.log(111111111)
//         const users: User[] = []
//         for (let i = 1000; i < 3000; i++) {
//             const hashedPassword = await bcrypt.hash(`user${i}pwd`, 10);

//             users.push({
//                 username: `user${i}`,
//                 email: `user${i}@gmail.com`,
//                 password: hashedPassword
//             } as User)
//         }
//         await User.bulkCreate(users);
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
//     console.log('success')
    
// }
// createFakeUser()

