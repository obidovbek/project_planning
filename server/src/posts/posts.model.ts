import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";
import { Sequelize } from 'sequelize';

interface PostCreationAttrs {
    goal: string[];
    // projPass: string[];
    generatedId: number;
    tasks: string[];
    kafed: string[];
    conDep: string[];
    spinOf: string[];
    firstCollImages: string[];
    middleCollImages: string[];
    title: string;
    owner: string;
    cost: string;
    workplace: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, unique: true})
    generatedId: number;

    @Column({type: DataType.ARRAY(DataType.STRING)})
    goal: string[];
    
    // @Column({type: DataType.ARRAY(DataType.STRING)})
    // projPass: string[];
    
    @Column({type: DataType.ARRAY(DataType.STRING)})
    tasks: string[];
    
    @Column({type: DataType.ARRAY(DataType.STRING)})
    kafed: string[];
    
    @Column({type: DataType.ARRAY(DataType.STRING)})
    conDep: string[];
        
    @Column({type: DataType.ARRAY(DataType.STRING)})
    spinOf: string[];

    @Column({type: DataType.ARRAY(DataType.STRING)})
    firstCollImages: string[];

    @Column({type: DataType.ARRAY(DataType.STRING)})
    middleCollImages: string[];

    @Column({type: DataType.STRING})
    title: string;
    
    @Column({type: DataType.STRING})
    owner: string;
    
    @Column({type: DataType.STRING})
    cost: string;

    @Column({type: DataType.STRING})
    workplace: string;

}
