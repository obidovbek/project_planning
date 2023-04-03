import {Body, Controller, Post, Get, UploadedFiles, UseInterceptors, Delete} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
// import {FileInterceptor} from "@nestjs/platform-express";
// import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage, Multer } from "multer";
// import { FormDataRequest } from "nestjs-form-data/dist/decorators";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    // @FormDataRequest()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'firstCollImages', maxCount: 5 },
        { name: 'middleCollImages', maxCount: 5 },
      ]))
    
    createPost(@Body() dto: CreatePostDto, @UploadedFiles() images: { firstCollImages?: Express.Multer.File[], middleCollImages?: Express.Multer.File[] }) {
        return this.postService.create(dto,images)
    }

    @Delete()
    delete(){
        return this.postService.delete();
    }

    @Get()
    getAll(){
        return this.postService.findAll();
    }
}
