import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  getHello(): string {
    return 'Hello World! projects';
  }
  postProject():string{
    return 'Post project';
  }
}
