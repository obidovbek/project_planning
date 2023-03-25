import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";

interface PostCreationAttrs {
    readonly goal: string[];
    readonly projPass: string[];
    readonly tasks: string[];
    readonly kafed: string[];
    readonly content: string[];
    readonly conDep: string[];
    readonly spinOf: string[];
    readonly mainData: Object;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.ARRAY(DataType.STRING)})
    goal: string[];
    
    @Column({type: DataType.ARRAY(DataType.STRING)})
    projPass: string[];
    
    @Column({type: DataType.ARRAY(DataType.STRING)})
    tasks: string[];
    
    @Column({type: DataType.ARRAY(DataType.STRING)})
    kafed: string[];
    
    @Column({type: DataType.ARRAY(DataType.STRING)})
    content: string[];
    
    @Column({type: DataType.ARRAY(DataType.STRING)})
    conDep: string[];
        
    @Column({type: DataType.ARRAY(DataType.STRING)})
    spinOf: string[];
        
    @Column({type: 'varchar'})
    mainData: object;


}
