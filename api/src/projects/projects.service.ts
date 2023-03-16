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
  async getProject(request): Promise<{message: string, posts?: Project[], maxPosts?: number}> {
    const pageSize = +request.query.pagesize;
    const currentPage = +request.query.page;
    
    var reqFilters = JSON.parse(request.query.filters);
    var filter = [];
    if(Object.keys(reqFilters).length){
        reqFilters?.map((f:any)=>{ filter.push({[f.field]: {$regex: f.search, $options : 'i'}}); });
    }
    const postQuery = this.projectModel.find(Object.keys(reqFilters).length ? {"$and": filter} : null);
    // console.log('postQuery', postQuery.countDocuments())
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery.sort({_id: -1}).skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    return postQuery
        .then(documents => {
            fetchedPosts = documents;
            return this.projectModel.count(Object.keys(reqFilters).length ? {"$and": filter} : null);
        })
        .then(count => {
            return {
                message: "Posts fetched successfully!",
                posts: fetchedPosts,
                maxPosts: count
            };
        })
        .catch(error => {
            return {
                message: "Fetching posts failed!"
            };
        });
    // return await this.handbookModel.find().exec();
}
}
