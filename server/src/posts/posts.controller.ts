import {Body, Controller, Post, Get, UploadedFiles, UseInterceptors, Delete, Req, Res, HttpStatus} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
// import {FileInterceptor} from "@nestjs/platform-express";
// import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage, Multer } from "multer";
// import { FormDataRequest } from "nestjs-form-data/dist/decorators";
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
  };
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    // @FormDataRequest()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'firstCollImages', maxCount: 5 },
        { name: 'middleCollImages', maxCount: 5 },
      ], {
        storage: diskStorage({
            destination: (req, file, cb) => {
              const isValid = MIME_TYPE_MAP[file.mimetype];
              let error = new Error("Invalid mime type");
              if (isValid) { error = null; }
              cb(error, "uploads");
            },
            filename: (req, file, cb) => {
              const ext = MIME_TYPE_MAP[file.mimetype];
              cb(null, Math.floor(Math.random() * 1000000000) + '_' + Date.now() + "." + ext);
            }
          })
      }))
    
    createPost(@Body() dto: CreatePostDto, @UploadedFiles() images: { firstCollImages?: Express.Multer.File[], middleCollImages?: Express.Multer.File[] }) {
        return this.postService.create(dto,images);
    }

    @Delete()
    delete(){
        return this.postService.delete();
    }

    @Get()
    async getAll(@Req() request,  @Res() response){
        const findAndCountAll = await this.postService.findAndCountAll(request);
        return response.status(HttpStatus.OK).json(findAndCountAll);
    }
}
