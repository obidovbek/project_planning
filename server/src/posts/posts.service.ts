import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService) {}

    async create(dto: any, images: any) {
        let firstCollImages = [];
        let middleCollImages = [];
        const file = await this.fileService.createFile(images.firstCollImages[0])
        // await images.firstCollImages?.map(async (image) => { firstCollImages.push(await this.fileService.createFile(image))});
        // await images.middleCollImages?.map(async (image) => { middleCollImages.push(await this.fileService.createFile(image))});
        // console.log('createPost images', dto, firstCollImages, middleCollImages)
        // const post = await this.postRepository.create({...dto, firstCollImages, middleCollImages});
        // console.log('createPost file', file)
        console.log('createPost images', images.firstCollImages[0])
        console.log('createPost', {...dto, firstCollImages, middleCollImages})
        return 1234;
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
