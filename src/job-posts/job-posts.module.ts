import { Module } from '@nestjs/common';
import { JobPostsService } from './job-posts.service';
import { JobPostsController } from './job-posts.controller';
import { OpenaiModule } from 'src/openai/openai.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [OpenaiModule, PrismaModule],
  providers: [JobPostsService],
  controllers: [JobPostsController],
})
export class JobPostsModule {}
