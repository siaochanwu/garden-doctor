import { Sequelize } from "sequelize-typescript";
import User from "../models/userModel";
import Post from "../models/postModel";
import Reply from "../models/replyModel";
import PostImage from "../models/postImageModel";
import ReplyImage from "../models/replyImageModel";
const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST} = process.env;



const sequelize = new Sequelize({
    database: DB_NAME,
    dialect: 'mysql',
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: 3307,
    models: [User, Post, Reply, PostImage, ReplyImage]
});

export default sequelize;