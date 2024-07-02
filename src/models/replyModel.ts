import {Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import User from './userModel';
import Post from './postModel';
import ReplyImage from './replyImageModel';

@Table({
    tableName: 'replies',
    timestamps: true
})
export default class Reply extends Model<Reply> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    })
    id?: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    text!: string;


    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    postId!: number;

    @BelongsTo(() => Post)
    post!: Post;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => ReplyImage)
    images!: ReplyImage[]
}