import { Request, Response } from 'express';
import Reply from '../models/replyModel';
import ReplyImage from '../models/replyImageModel';
import UserModel from '../models/userModel';
import Post from '../models/postModel';
import { Op } from 'sequelize';

interface User {
  id: number
};

interface RequestUser extends Request {
  user?: User,
}

export const addReply = async (req: RequestUser, res: Response) => {
  const { postId, text } = req.body;

  // if post does not exist
  const post = await Post.findByPk(postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  } 

  try {
    const newReply = await Reply.create({
      postId,
      userId: req.user?.id,
      text
    } as Reply);
  
    const imageFiles = req.files as Express.Multer.File[];
    const imageRecords = imageFiles.map(file => ({ imageUrl: file.path, replyId: newReply.id }));
    await ReplyImage.bulkCreate(imageRecords as ReplyImage[]);
  
    res.status(201).json({ message: 'Reply added'});
  } catch (err) {
    console.error(err);
    // create reply failed
    res.status(500).json({ message: 'Sql error' });
  }
};

export const getReplies = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  const replies = await Reply.findAll({ 
    where: { postId },
    offset: (page - 1) * limit,
    limit,
    include: [ReplyImage]});

    try {
      //get username
      const repliesWithUsername = await Promise.all(replies.map(async (reply) => {
        const user = await UserModel.findByPk(reply.userId);
        reply.setDataValue('username' as keyof Reply, user?.username);
      }))
      
      res.status(200).json(replies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Sql error' });
    }
};

export const editReply = async (req: RequestUser, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    await Reply.update({ text }, { where: { id, userId: req.user?.id } });
    res.status(201).json({ message: 'Reply updated'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sql error' });
  }

}

export const deleteReply = async (req: RequestUser, res: Response) => { 
  const { id } = req.params;

  try {
    //check if reply exists and user is authorized to delete
    const reply = await Reply.findByPk(id);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    if (reply.userId !== req.user?.id) {
      return res.status(401).json({ message: 'User not authorized to delete this reply' });
    }
  
    await Reply.destroy({ where: { id, userId: req.user?.id } });
    res.status(200).json({ message: 'Reply deleted'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sql error' });
  }
} 

export const getSearchReplies = async (req: Request, res: Response) => {
  const {keyword} = req.body;

  try {
    const replies = await Reply.findAll({
      where: {
        [Op.or]: [
          {
            text: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ]
      },
      offset: 0,
      limit: 10,
      include: [ReplyImage],
    })
    res.status(200).json(replies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sql error' });
  }

}
