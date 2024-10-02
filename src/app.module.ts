import { Module } from '@nestjs/common';
import { ResumeUploadModule } from './resume-upload/resume-upload.module';
import { OpenaiService } from './openai/openai.service';
import { ConfigModule } from '@nestjs/config';
import { JobPostsModule } from './job-posts/job-posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ResumeUploadModule,
    JobPostsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [OpenaiService, PrismaService],
  exports: [OpenaiService, PrismaService],
})
export class AppModule {}
