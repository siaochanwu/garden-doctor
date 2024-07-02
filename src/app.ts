import 'dotenv/config'
import express, { Application } from "express";
import bodyParser from 'body-parser';
import sequelize from './config/db';
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

const PORT = process.env.PORT || 3000;
const start = async (): Promise<void> => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
void start();


module.exports = app;
