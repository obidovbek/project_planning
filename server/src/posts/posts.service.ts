import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService) {}

    async create(dto: any) {
        // const fileName = await this.fileService.createFile(image);
        console.log('createPost 1', dto)
        const post = await this.postRepository.create(dto)
        return post;
    }
    async delete(){
        return this.postRepository.destroy({ truncate: true })
    }
    async findAll(){
        console.log('findAll')
        const posts = await this.postRepository.findAll();
        return posts;
    }
}
