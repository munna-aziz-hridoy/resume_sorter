import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { ResumeUploadService } from './resume-upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('resume-upload')
export class ResumeUploadController {
  constructor(private readonly resumeUploadService: ResumeUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { id: string },
  ) {
    if (!file) {
      return { message: 'File not uploaded' };
    }

    try {
      // Process the file and save it to Firebase Storage
      const result = await this.resumeUploadService.processFile(file, body.id);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to process file');
    }
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 100))
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { job_description: string },
  ) {
    if (!files || files.length === 0) {
      return { message: 'No files uploaded' };
    }

    try {
      const result = await this.resumeUploadService.processMultipleFiles(
        files,
        body.job_description,
      );
      return {
        message: 'Files uploaded and processed successfully',
        result,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to process files');
    }
  }
}
