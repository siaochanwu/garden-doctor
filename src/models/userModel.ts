import {Table, Column, Model, DataType, HasMany, AllowNull} from 'sequelize-typescript';
import Post from './postModel';
import Reply from './replyModel';

@Table({
    tableName: 'users',
    timestamps: true
})
export default class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    })
    id?: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        field: 'username'
    })
    username!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: 'password'
    })
    password!: string;
    
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: 'email'
    })
    email!: string;

    @HasMany(() => Post)
    posts!: Post[];

    @HasMany(() => Reply)
    replies!: Reply[];
}