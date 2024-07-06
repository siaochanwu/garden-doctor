import request from 'supertest';
import app from '../app';
import sequelize from '../config/db';
import User from '../models/userModel';
import Post from '../models/postModel';
import PostImage from '../models/postImageModel';

let token: string;
let newPostId: number | undefined;

beforeAll(async () => {
    await sequelize.sync();

    await User.destroy({ where: {} });
    await Post.destroy({ where: {} });
    await PostImage.destroy({ where: {} });
    

    // register a user
    await (request(app) as any)
        .post('/users/register')
        .send({
            username: 'user2',
            email: 'user2@gmail.com',
            password: 'user2pwd'
        });

    // login the user
    const res = await (request(app) as any)
        .post('/users/login')
        .send({
            email: 'user2@gmail.com',
            password: 'user2pwd'
        })
    token = res.body.token;
    console.log(token);
})


describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await (request(app) as any)
            .post('/posts/post')
            .set('Authorization', `Bearer ${token}`)
            .field('question', 'What is wrong with my plant?')
            .field('plantType', 'Rose')
            .field('environment', 'Outdoor')
            // .attach('images', path.resolve(__dirname, 'test-files/image1.jpg'))
            // .attach('images', path.resolve(__dirname, 'test-files/image2.jpg'));

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');

        const post = await Post.findOne({ where: { question: 'What is wrong with my plant?' } });
        newPostId = post?.id;

        expect(post).not.toBeNull();
        expect(post).toHaveProperty('plantType', 'Rose');
        expect(post).toHaveProperty('environment', 'Outdoor');

        // const images = await PostImage.findAll({ where: { postId: post?.id } });
        // expect(images.length).toBe(2);
        // expect(images[0]).toHaveProperty('imageUrl');
        // expect(images[1]).toHaveProperty('imageUrl');
    },);

    it('should not create a new post without token', async () => {
        const res = await (request(app) as any)
            .post('/posts/post')
            .field('question', 'What is wrong with my plant?')
            .field('plantType', 'Rose')
            .field('environment', 'Outdoor')
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message');
    })

    it('should get all posts', async () => {
        const res = await (request(app) as any)
            .get('/posts/posts');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    });


    it('should get one post', async () => {
        const res = await (request(app) as any)
            .get(`/posts/posts/${newPostId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('question');
    });

    it('should not get one post with wrong id', async () => {
        const res = await (request(app) as any)
            .get(`/posts/posts/1`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
    });
    
    it('should edit a post', async () => {
        const res = await (request(app) as any)
            .put(`/posts/posts/${newPostId}`)
            .set('Authorization', `Bearer ${token}`)
            .field('question', 'What is wrong with my plant?')
            .field('plantType', 'Rose')
            .field('environment', 'Indoor')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

    it('should not edit a post without token', async () => {
        const res = await (request(app) as any)
            .put(`/posts/posts/${newPostId}`)
            .field('question', 'What is wrong with my plant?')
            .field('plantType', 'Rose')
            .field('environment', 'Outdoor')
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message');
    });

    it('should not edit a post with wrong id', async () => {
        const res = await (request(app) as any)
            .put('/posts/posts/2')
            .set('Authorization', `Bearer ${token}`)
            .field('question', 'What is wrong with my plant?')
            .field('plantType', 'Rose')
            .field('environment', 'Indoor')
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
    });

    it('should not edit a post with wrong token', async () => {
        const res = await (request(app) as any)
            .put(`/posts/posts/${newPostId}`)
            .set('Authorization', `Bearer wrongtoken`)
            .field('question', 'What is wrong with my plant?')
            .field('plantType', 'Rose')
            .field('environment', 'Indoor')
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });

    it('should delete a post', async () => {
        const res = await (request(app) as any)
            .delete(`/posts/posts/${newPostId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

    it('should not delete a post without token', async () => {
        const res = await (request(app) as any)
            .delete(`/posts/posts/${newPostId}`);
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message');
    });

    it('should not delete a post with wrong token', async () => {
        const res = await (request(app) as any)
            .delete(`/posts/posts/${newPostId}`)
            .set('Authorization', `Bearer wrongtoken`);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });

    it('should not delete a post with wrong id', async () => {
        const res = await (request(app) as any)
            .delete('/posts/posts/2')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
    });

})