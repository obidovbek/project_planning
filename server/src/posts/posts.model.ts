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

    @Column({type: 'varchar', allowNull: false})
    goal: string[];
    
    @Column({type: 'varchar', allowNull: false})
    projPass: string[];
    
    @Column({type: 'varchar', allowNull: false})
    tasks: string[];
    
    @Column({type: 'varchar', allowNull: false})
    kafed: string[];
    
    @Column({type: 'varchar', allowNull: false})
    content: string[];
    
    @Column({type: 'varchar', allowNull: false})
    conDep: string[];
        
    @Column({type: 'varchar', allowNull: false})
    spinOf: string[];
        
    @Column({type: 'varchar', allowNull: false})
    mainData: object;


}
