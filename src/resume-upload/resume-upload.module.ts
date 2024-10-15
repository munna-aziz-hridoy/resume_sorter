import { Module } from '@nestjs/common';
import { ResumeUploadController } from './resume-upload.controller';
import { ResumeUploadService } from './resume-upload.service';
import { OpenaiModule } from 'src/openai/openai.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [OpenaiModule, FirebaseModule, PrismaModule],
  controllers: [ResumeUploadController],
  providers: [ResumeUploadService],
})
export class ResumeUploadModule {}
