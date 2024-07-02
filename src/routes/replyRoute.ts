import { Router } from 'express';
import multer from 'multer';
import { addReply, getReplies } from '../controllers/replyController';
import { authenticate } from '../middleware/authMiddleware';

const reply = Router();
const upload = multer({ dest: 'uploads/' });

reply.post('/reply', authenticate, upload.array('images'), addReply);
reply.get('/replies/:postId', getReplies);

export default reply;