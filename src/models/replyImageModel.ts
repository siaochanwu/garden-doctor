import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Reply from './replyModel';

@Table({
    tableName: 'replyImages',
    timestamps: true
})
export default class ReplyImage extends Model<ReplyImage> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl!: string;

  @ForeignKey(() => Reply)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  replyId!: number;

  @BelongsTo(() => Reply)
  reply!: Reply;
}