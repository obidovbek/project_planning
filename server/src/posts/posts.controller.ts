import {Body, Controller, Post, UploadedFile, UseInterceptors, Delete} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    createPost(@Body() dto: CreatePostDto) {
                console.log(123)
        return this.postService.create(dto)
    }
    @Delete()
    delete(){
        return this.postService.delete();
    }
}
