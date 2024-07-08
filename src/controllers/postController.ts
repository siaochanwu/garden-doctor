import { Request, Response } from 'express';
import Post from '../models/postModel';
import PostImage from '../models/postImageModel';
import { Op } from 'sequelize';
import NodeCache from 'node-cache';

const myCache = new NodeCache();
interface User {
  id: number
};

interface RequestUser extends Request {
  user?: User,
}

export const addPost = async (req: RequestUser, res: Response) => {
  const { question, plantType, environment } = req.body;
  // console.log(333, question, plantType, environment)

  const newPost = await Post.create({
    userId: req.user?.id,
    question,
    plantType,
    environment,
  } as Post)

  const imageFiles = req.files as Express.Multer.File[];
  const imageRecords = imageFiles.map(file => ({ imageUrl: file.path, postId: newPost.id }));
  // console.log(444, imageRecords)
  await PostImage.bulkCreate(imageRecords as unknown as PostImage[]);
  res.status(201).json({ message: 'Post created'});
};

export const getAllPosts = async (req: Request, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  const posts = await Post.findAll({
    offset: (page - 1) * limit,
    limit,
    include: [PostImage]
  });
  res.json(posts);
};

export const getOnePost = async (req: Request, res: Response) => {
  
  if (myCache.has(req.params.id)) {
      console.log('cache hit!!!!!!')
      return res.json(myCache.get(req.params.id));
  }
  
  try {
    const post = await Post.findByPk(req.params.id, {include: [PostImage]});
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Cache post using the post's ID as the key
    myCache.set(req.params.id, post.toJSON(), 10000);
    
    return res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ message: "Error fetching post" });
  }
};

export const editPost = async (req: RequestUser, res: Response) => {
  const { question, plantType, environment } = req.body;
  const postId = req.params.id;

  //check if post exists and user is authorized to edit
  const post = await Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  if (post.userId !== req.user?.id) {
    return res.status(401).json({ message: 'User not authorized to edit this post' });
  }

  const updatedPost = await Post.update(
    { question, plantType, environment },
    { where: { id: postId, userId: req.user?.id } }
  );

  //check if images are included
  if (!req.files) {
    return res.status(200).json({ message: 'Post updated' });
  } else {
    //update images
    const imageFiles = req.files as Express.Multer.File[];
    const imageRecords = imageFiles.map(file => ({ imageUrl: file.path, postId })) as unknown[];
    await PostImage.bulkCreate(imageRecords as PostImage[]);
    //delete old images
    await PostImage.destroy({ where: { postId } });
    //add new images
    await PostImage.bulkCreate(imageRecords as PostImage[]);
  }
  

  console.log(updatedPost)

  res.status(200).json({ message: 'Post updated' });
}

export const deletePost = async (req: RequestUser, res: Response) => {
  const postId = req.params.id;

  //check if post exists and user is authorized to delete
  const post = await Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  if (post.userId !== req.user?.id) {
    return res.status(401).json({ message: 'User not authorized to delete this post' });
  }

  await Post.destroy({ where: { id: postId, userId: req.user?.id } });
  res.status(200).json({ message: 'Post deleted' });
}

export const getSearchPosts = async (req: Request, res: Response) => {
  const { keyword } = req.body;
  console.log(111, keyword)

  // using %like to search 
  const posts = await Post.findAll({
    where: {
      [Op.or]: [
        {
          question: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          plantType: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          environment: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    },
    include: [PostImage],
  });
  res.json(posts);
}