import { Request, Response } from 'express';
import Reply from '../models/replyModel';
import ReplyImage from '../models/replyImageModel';

interface User {
  id: number
};

interface RequestUser extends Request {
  user?: User,
}

export const addReply = async (req: RequestUser, res: Response) => {
  const { postId, text } = req.body;
  const images = Array.isArray(req.files) ? req.files.map((file: any) => file.path) : [];
  const newReply = await Reply.create({
    postId,
    userId: req.user?.id,
    text
  } as Reply);

  const imageFiles = req.files as Express.Multer.File[];
  const imageRecords = imageFiles.map(file => ({ imageUrl: file.path, replyId: newReply.id }));
  await ReplyImage.bulkCreate(imageRecords as ReplyImage[]);

  res.status(201).send('Reply added');
};

export const getReplies = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const replies = await Reply.findAll({ where: { postId }, include: [ReplyImage]});
  res.json(replies);
};

