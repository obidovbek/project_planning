import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {

  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>){}

  getHello(): string {
    return 'Hello World! projects';
  }
  async createProject(project: Project): Promise<Project> {
    const createdCat = new this.projectModel(project);
    return createdCat.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }
}
