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
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('resume-upload')
export class ResumeUploadController {
  constructor(private readonly resumeUploadService: ResumeUploadService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'File not uploaded' };
    }

    try {
      const result = await this.resumeUploadService.processFile(file);

      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to proccess file');
    }
  }

  @Post('upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files', 100, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: { files: 100, fileSize: 100 * 1024 * 1024 },
    }),
  )
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
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to proccess files');
    }
  }
}
