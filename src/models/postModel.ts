import {Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import User from './userModel';
import Reply from './replyModel';
import PostImage from './postImageModel';

@Table({
    tableName: 'posts',
    timestamps: true
})
export default class Post extends Model<Post> {
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
    question!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    plantType!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    environment!: string;
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
        })
        userId!: number;
        
    @BelongsTo(() => User)
    user?: User;

    @HasMany(() => PostImage) // Add a HasMany association to the PostImage model
    images!: PostImage[]; // Change the data type to PostImage[]

    @HasMany(() => Reply)
    replies!: Reply[]
}

