import { Request, Response } from 'express';
import Post from '../models/postModel';
import PostImage from '../models/postImageModel';

interface User {
  id: number
};

interface RequestUser extends Request {
  user?: User,
}

export const addPost = async (req: RequestUser, res: Response) => {
  const { question, plantType, environment } = req.body;
  console.log(333, question, plantType, environment)
  // const images = Array.isArray(req.files) ? req.files.map((file: any) => file.path) : [];
  const newPost = await Post.create({
    userId: req.user?.id,
    question,
    plantType,
    environment,
  } as Post)

  const imageFiles = req.files as Express.Multer.File[];
  const imageRecords = imageFiles.map(file => ({ imageUrl: file.path, postId: newPost.id }));
  console.log(444, imageRecords)
  await PostImage.bulkCreate(imageRecords as PostImage[]);
  res.status(201).send('Post created');
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.findAll({include: [PostImage]});
  res.json(posts);
};


