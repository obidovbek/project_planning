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
        let firstCollImages = images.firstCollImages?.map(image=>image.filename);
        firstCollImages = firstCollImages&&firstCollImages.length?firstCollImages:[];
        let middleCollImages = images.middleCollImages?.map(image=>image.filename);
        middleCollImages = middleCollImages&&middleCollImages.length?middleCollImages:[];
        // var randomNumber = Math.floor(Math.random() * 900000) + 100000;
        const post = await this.postRepository.create(
            {
                generatedId:  Math.floor(Math.random() * 900000) + 100000,
                goal: (typeof dto.goal === 'string')?[dto.goal]:dto.goal,
                tasks: (typeof dto.tasks === 'string')?[dto.tasks]:dto.tasks,
                kafed: (typeof dto.kafed === 'string')?[dto.kafed]:dto.kafed,
                conDep: (typeof dto.conDep === 'string')?[dto.conDep]:dto.conDep,
                spinOf: (typeof dto.spinOf === 'string')?[dto.spinOf]:dto.spinOf,
                title: dto.title,
                owner: dto.owner,
                cost: dto.cost,
                workplace: dto.workplace,
                firstCollImages, 
                middleCollImages
        });
        return post;
    }
    async delete(){
        return this.postRepository.destroy({ truncate: true })
    }
    async findAndCountAll(request: any){
        const limit = +request.query.limit ? ((+request.query.limit <= 200)?(+request.query.limit):200) : 10;
        const page = +request.query.page ? +request.query.page: 1;

        const offset = limit * (page - 1);
        const posts = await Post.findAndCountAll({
          limit,
          offset,
          order: [['createdAt', 'DESC']],
        });
    
        // const totalPages = Math.ceil(posts.count / limit);
        return {
          posts: posts.rows?.map(post=>post.dataValues),
          currentPage: page,
          totalPosts: posts.count,
        };
    }
}
