import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { Job_Description_Response, Job_Save_Response } from 'types/response';
import { SaveJobDto } from './dto/save-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobPostsService {
  constructor(
    private readonly openAiService: OpenaiService,
    private prismaService: PrismaService,
  ) {}

  async getAllJobPost(queryParams: {
    status?: string;
    type?: string;
    company_name?: string;
  }) {
    try {
      const { status, type, company_name } = queryParams;

      // Build the where clause dynamically based on the query params
      const whereClause: any = {};

      if (status) whereClause.status = status;
      if (type) whereClause.type = type;
      if (company_name) whereClause.company_name = company_name;

      // Use the where clause in the Prisma query
      const result = await this.prismaService.job_Post.findMany({
        where: whereClause,
      });

      return {
        success: true,
        message: 'Job post details retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new Error('Failed to retrieved saved job');
    }
  }

  async getOneJobPost(id: string) {
    try {
      const result = await this.prismaService.job_Post.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      return {
        success: true,
        message: 'Job post details retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new Error('Failed to retrieved saved job');
    }
  }

  async getJobPostsDesc(
    jobPostDto: CreateJobPostDto,
  ): Promise<Job_Description_Response> {
    // Pass the DTO object to the getJobDescription method
    try {
      const result = await this.openAiService.getJobDescription(jobPostDto);
      return result;
    } catch (error) {
      throw new Error('Failed to get job description');
    }
  }

  async saveJob(saveJob: SaveJobDto): Promise<Job_Save_Response> {
    try {
      const result = await this.prismaService.job_Post
        .create({
          data: saveJob,
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error.message);
        });

      return {
        success: true,
        message: 'Job saved successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to save job');
    }
  }
}
