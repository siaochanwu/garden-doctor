import 'dotenv/config'
import express, { Application } from "express";
import bodyParser from 'body-parser';
import user from './routes/userRoute';
import post from './routes/postRoute';
import reply from './routes/replyRoute';
import sequelize from './config/db';
import setupSwagger from './swaggerConfig';


const app: Application = express();


app.use(bodyParser.json());
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
setupSwagger(app);

app.use('/uploads', express.static('uploads'));
app.use('/users', user);
app.use('/posts', post);
app.use('/replies', reply);


const start = async (): Promise<void> => {
    try {
        await sequelize.sync();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
void start();

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;
