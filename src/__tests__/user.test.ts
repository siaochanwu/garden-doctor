import request from 'supertest';
import app from '../app';
import sequelize from '../config/db';
import User from '../models/userModel';

beforeAll(async () => {
    await sequelize.sync();
    //delete all users
    await User.destroy({ where: {} }); // Delete all users before each test
})

describe('User Endpoints', () => {
    it('should register a new user', async () => {
        const res = await (request(app) as any)
            .post('/users/register')
            .send({
                username: 'user1',
                email: 'user1@gmail.com',
                password: 'user1pwd'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');
    });

    it('should login a user', async () => {
        const res = await (request(app) as any)
            .post('/users/login')
            .send({
                email: 'user1@gmail.com',
                password: 'user1pwd'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not login a user with wrong password', async () => {
        const res = await (request(app) as any)
            .post('/users/login')
            .send({
                email: 'user1@gmail.com',
                password: 'wrongpwd'
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message');
    });

    it('should not login a user with wrong email', async () => {
        const res = await (request(app) as any)
            .post('/users/login')
            .send({
                email: 'fakemail@yahoo.com',
                password: 'user1pwd'
            })
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message');
    })

    // it('should forget password', async () => {
    //     const res = await (request(app) as any)
    //         .post('/users/forget-password')
    //         .send({
    //             email: 'user1@gmail.com'
    //         })
    //     expect(res.statusCode).toEqual(200);
    // });

    // it('should reset password', async () => {
    //     const res = await (request(app) as any)
    //         .put('/users/reset-password')
    //         .send({
    //             email: 'user1@gmail.com',
    //             password: 'newpassword'
    //         })
    //     expect(res.statusCode).toEqual(200);
    // })

    it('should logout a user', async () => {
        const res = await (request(app) as any)
            .post('/users/logout')
        expect(res.statusCode).toEqual(200);
    });

});

