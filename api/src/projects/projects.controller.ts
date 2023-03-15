import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Response } from 'express';
import { Project } from './project.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.findAll();
  }
  @Post()
  createProject(@Body() createProjectDto: Project) {
    return this.projectsService.createProject(createProjectDto);;
  }

}
