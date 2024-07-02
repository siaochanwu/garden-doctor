import { Router } from 'express';
import multer from 'multer';
import { addPost, getAllPosts } from '../controllers/postController';
import { authenticate } from '../middleware/authMiddleware';

const post = Router();
const upload = multer({ dest: 'uploads/' });

post.post('/post', authenticate, upload.array('images'), addPost);
post.get('/posts', getAllPosts);

export default post;
