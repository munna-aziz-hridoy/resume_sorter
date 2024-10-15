import { Injectable } from '@nestjs/common';
import path from 'path';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

import { OpenaiService } from '../openai/openai.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResumeUploadService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly openaiService: OpenaiService,
    private readonly prismaService: PrismaService,
  ) {}

  async processFile(file: Express.Multer.File, id: string): Promise<any> {
    const fileType = path.extname(file.originalname).toLowerCase();

    if (fileType !== '.pdf' && fileType !== '.docx') {
      throw new Error('Unsupported file type');
    }

    let resumeContent;

    // Handle PDF files
    if (fileType === '.pdf') {
      const pdfData = await pdf(file.buffer);
      const formattedText = this.formatPdfText(pdfData.text);

      resumeContent = {
        text: formattedText,
        name: file.originalname,
        type: 'pdf',
      };
    }

    // Handle DOCX files
    if (fileType === '.docx') {
      const { value: text } = await mammoth.extractRawText({
        buffer: file.buffer,
      });

      resumeContent = {
        text,
        name: file.originalname,
        type: 'docx',
      };
    }

    // Upload the file to Firebase Storage
    const fileUrl = await this.firebaseService.uploadFile(file);
    const job = await this.prismaService.job_Post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    const openAiResult = await this.openaiService.getResumeRanking(
      resumeContent.text,
      job.job_description,
      fileUrl,
    );

    const startIndex = openAiResult.indexOf('[');
    const endIndex = openAiResult.lastIndexOf(']') + 1;
    const jsonString = openAiResult.slice(startIndex, endIndex);
    console.log(jsonString);
    const cadidateData = JSON.parse(jsonString);
    await this.prismaService.candidates.create({
      data: {
        name: cadidateData[0].name,
        phone: cadidateData[0].phone,
        email: cadidateData[0].email,
        rank: cadidateData[0].rank,
        resume_url: fileUrl,
        education: cadidateData[0].education,
        university: cadidateData[0].university,
        job_experience: cadidateData[0].job_experience,
        previous_company: cadidateData[0].previous_company,
        job_post_id: parseInt(id),
      },
    });

    return {
      message: 'Your Application submitted.',
    };
  }

  async processMultipleFiles(
    files: Array<Express.Multer.File>,
    jobDescription: string,
  ): Promise<any> {
    const fileProcessingResults = await Promise.all(
      files.map(async (file) => {
        const fileType = path.extname(file.originalname).toLowerCase();

        try {
          // Handle PDF files
          if (fileType === '.pdf') {
            const pdfData = await pdf(file.buffer);
            const formattedText = this.formatPdfText(pdfData.text);

            const fileUrl = await this.firebaseService.uploadFile(file);

            return {
              text: formattedText,
              name: file.originalname,
              type: 'pdf',
              url: fileUrl,
            };
          }

          // Handle Word (.docx) files
          if (fileType === '.docx') {
            const { value: text } = await mammoth.extractRawText({
              buffer: file.buffer,
            });

            const fileUrl = await this.firebaseService.uploadFile(file);

            return {
              text,
              name: file.originalname,
              type: 'docx',
              url: fileUrl,
            };
          }

          // Return error if file type is unsupported
        } catch (error) {
          throw new Error('Failed to process files');
        }
      }),
    );

    const resumes = fileProcessingResults
      .map((result) => {
        return result.text;
      })
      .join(`\n-------------------------\n`);

    const resumes_url = fileProcessingResults
      .map((result) => {
        return result.url;
      })
      .join(`\n-------------------------\n`);

    const result = await this.openaiService.getResumesRanking(
      resumes,
      jobDescription,
      resumes_url,
    );

    const startIndex = result.indexOf('[');
    const endIndex = result.lastIndexOf(']') + 1;

    const jsonString = result.slice(startIndex, endIndex);

    return {
      success: true,
      result,
      data: JSON.parse(jsonString),
    };
  }

  /**
   * Format the raw text extracted from PDF to include line breaks,
   * headers, or any other custom formatting.
   */
  private formatPdfText(rawText: string): string {
    const cleanedText = rawText.replace(/\s+/g, ' ').trim();
    const sentences = cleanedText.split(/(?<=[.!?])\s+/);

    const formattedSentences = sentences.map((sentence) => {
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    });

    return formattedSentences.join('\n\n');
  }
}
