import { Router } from 'express';
import multer from 'multer';
import { addPost, getAllPosts, getOnePost, editPost, deletePost, getSearchPosts } from '../controllers/postController';
import { authenticate } from '../middleware/authMiddleware';

const post = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('請上傳正確的檔案格式'));
        }
        cb(null, true);
    }
});


post.get('/posts', getAllPosts);
post.get('/posts/:id', getOnePost);
post.post('/post', authenticate, upload.array('images'), addPost);
post.put('/posts/:id', authenticate, upload.array('images'), editPost);
post.delete('/posts/:id', authenticate, deletePost);

// search posts by keyword
post.post('/posts/search', getSearchPosts);


export default post;
