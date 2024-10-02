// job-posts.controller.ts

import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JobPostsService } from './job-posts.service';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { SaveJobDto } from './dto/save-job.dto';

@Controller('job-posts')
export class JobPostsController {
  constructor(private readonly jobPostService: JobPostsService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  createJobPost(@Body() createJobPostDto: CreateJobPostDto) {
    return this.jobPostService.getJobPosts(createJobPostDto);
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
