import 'dotenv/config'
import express, { Application } from "express";
import bodyParser from 'body-parser';
import user from './routes/userRoute';
import post from './routes/postRoute';
import reply from './routes/replyRoute';


const app: Application = express();


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));
app.use('/users', user);
app.use('/posts', post);
app.use('/replies', reply);


export default app;
