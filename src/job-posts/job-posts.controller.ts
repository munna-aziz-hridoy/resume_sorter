// job-posts.controller.ts

import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { JobPostsService } from './job-posts.service';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { SaveJobDto } from './dto/save-job.dto';

@Controller('job-posts')
export class JobPostsController {
  constructor(private readonly jobPostService: JobPostsService) {}

  @Get('all')
  getAllJobPosts(
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('company_name') company_name?: string,
  ) {
    const queryParams = {
      status,
      type,
      company_name,
    };
    return this.jobPostService.getAllJobPost(queryParams);
  }

  @Get('details/:id')
  getJobPostDetails(@Param('id') id: string) {
    return this.jobPostService.getOneJobPost(id);
  }

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  createJobPost(@Body() createJobPostDto: CreateJobPostDto) {
    return this.jobPostService.getJobPostsDesc(createJobPostDto);
  }

  @Post('save')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  saveJobPost(@Body() saveJobPost: SaveJobDto) {
    return this.jobPostService.saveJob(saveJobPost);
  }
}
