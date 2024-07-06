import app from './app';
import sequelize from './config/db';

const port = process.env.PORT || 3000;

const start = async (): Promise<void> => {
    try {
        await sequelize.sync();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
void start();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
