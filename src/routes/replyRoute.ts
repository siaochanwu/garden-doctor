import { Router } from 'express';
import multer from 'multer';
import { addReply, getReplies, editReply, deleteReply } from '../controllers/replyController';
import { authenticate } from '../middleware/authMiddleware';

const reply = Router();
const upload = multer({ dest: 'uploads/' });

reply.post('/reply', authenticate, upload.array('images'), addReply);
reply.get('/replies/:postId', getReplies);
reply.put('/reply/:id', authenticate, upload.array('images'), editReply);
reply.delete('/reply/:id', authenticate, deleteReply);

export default reply;