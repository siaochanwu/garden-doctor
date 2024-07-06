import request from 'supertest';
import app from '../app';
import sequelize from '../config/db';
import User from '../models/userModel';
import Reply from '../models/replyModel';
import ReplyImage from '../models/replyImageModel';
import Post from '../models/postModel';

let token: string;
let postertoken: string;
let newReplyId: number | undefined;
let postId: number | undefined;

beforeAll(async () => {
    await sequelize.sync();

    await User.destroy({ where: {} });
    await Reply.destroy({ where: {} });
    await ReplyImage.destroy({ where: {} });
    await Post.destroy({ where: {} });

    // register a post user
    await (request(app) as any)
        .post('/users/register')
        .send({
            username: 'user2',
            email: 'user2@gmail.com',
            password: 'user2pwd'
        });

    // login the poster user
    const loginposter = await (request(app) as any)
        .post('/users/login')
        .send({
            email: 'user2@gmail.com',
            password: 'user2pwd'
        })
    postertoken = loginposter.body.token;

    // register a reply user
    await (request(app) as any)
        .post('/users/register')
        .send({
            username: 'test2',
            email: 'test2@gmail.com',
            password: 'test2pwd'
        })

    // login the user
    const res = await (request(app) as any)
        .post('/users/login')
        .send({
            email: 'test2@gmail.com',
            password: 'test2pwd'
        })
    token = res.body.token; 
    
    // create a post
    const post = await (request(app) as any)
        .post('/posts/post')
        .set('Authorization', `Bearer ${postertoken}`)
        .field('question', 'What is wrong with my plant?')
        .field('plantType', 'Rose')
        .field('environment', 'Outdoor')

    const findPost = await Post.findOne({ where: { question: 'What is wrong with my plant?' } });
    postId = findPost?.id;
    console.log('postId', postId);
});

describe('Reply Endpoints', () => {
    it('should create a new reply', async () => {
        const res = await (request(app) as any)
            .post('/replies/reply')
            .set('Authorization', `Bearer ${token}`)
            .field('text', 'Your plant needs more sunlight')
            .field('postId', postId)

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');

        const reply = await Reply.findOne({ where: { text: 'Your plant needs more sunlight' } });
        newReplyId = reply?.id;
    });

    it('should get all replies for a post', async () => {
        const res = await (request(app) as any)
            .get(`/replies/replies/${postId}`);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveLength(1);
    });

    it('should edit a reply', async () => {
        const res = await (request(app) as any)
            .put(`/replies/reply/${newReplyId}`)
            .set('Authorization', `Bearer ${token}`)
            .field('text', 'Your plant needs more sunlight and water')

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');
    });

    it('should delete a reply', async () => {
        const res = await (request(app) as any)
            .delete(`/replies/reply/${newReplyId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');
    });


})