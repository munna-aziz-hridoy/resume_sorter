import { Module } from '@nestjs/common';
import { ResumeUploadModule } from './resume-upload/resume-upload.module';
import { OpenaiService } from './openai/openai.service';
import { ConfigModule } from '@nestjs/config';
import { JobPostsModule } from './job-posts/job-posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';
import { CandidatesService } from './candidates/candidates.service';
import { CandidatesController } from './candidates/candidates.controller';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ResumeUploadModule,
    JobPostsModule,
    PrismaModule,
    FirebaseModule,
    CandidatesModule,
  ],
  controllers: [CandidatesController],
  providers: [OpenaiService, PrismaService, FirebaseService, CandidatesService],
  exports: [OpenaiService, PrismaService, FirebaseService],
})
export class AppModule {}
