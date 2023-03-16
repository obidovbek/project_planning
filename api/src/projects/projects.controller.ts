import { Controller, Get, Post, Res, Body, Req, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Response } from 'express';
import { Project } from './project.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(@Req() request,  @Res() response) {
    const projects = await this.projectsService.getProject(request);
    return response.status(HttpStatus.OK).json(projects)
  }
  @Post()
  createProject(@Body() createProjectDto: Project) {
    return this.projectsService.createProject(createProjectDto);;
  }

}
