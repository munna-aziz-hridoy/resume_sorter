import { Module } from '@nestjs/common';
import { ResumeUploadController } from './resume-upload.controller';
import { ResumeUploadService } from './resume-upload.service';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [ResumeUploadController],
  providers: [ResumeUploadService],
})
export class ResumeUploadModule {}
