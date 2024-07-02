import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Post from './postModel';

@Table({
    tableName: 'postImages',
    timestamps: true
})
export default class PostImage extends Model<PostImage> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  imageUrl!: string;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  postId!: number;

  @BelongsTo(() => Post)
  post!: Post;
}