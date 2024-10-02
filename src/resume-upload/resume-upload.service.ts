import { Injectable } from '@nestjs/common';
import * as path from 'path';
import pdf from 'pdf-parse';
import * as fs from 'fs';
import * as mammoth from 'mammoth';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class ResumeUploadService {
  constructor(private readonly openaiService: OpenaiService) {}

  async processFile(file: Express.Multer.File): Promise<any> {
    const fileType = path.extname(file.originalname).toLowerCase();

    if (fileType !== '.pdf' && fileType !== '.docx')
      throw new Error('Unsupported file type');

    let resume_content;

    // Handle PDF files
    if (fileType === '.pdf') {
      const pdfData = await pdf(fs.readFileSync(file.path));
      const formattedText = this.formatPdfText(pdfData.text);

      resume_content = {
        text: formattedText,
        name: file.originalname,
        type: 'pdf',
      };
    }

    // Handle DOCX files
    if (fileType === '.docx') {
      // Ensure that the file path used is the actual file, not a directory
      const { value: text } = await mammoth.extractRawText({ path: file.path });

      resume_content = {
        text,
        name: file.originalname,
        type: 'docx',
      };
    }
  }

  async processMultipleFiles(
    files: Array<Express.Multer.File>,
    job_description: string,
  ): Promise<any> {
    const fileProcessingResults = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(__dirname, '../../', file.path);
        const fileType = path.extname(file.originalname).toLowerCase();

        try {
          // Handle PDF files
          if (fileType === '.pdf') {
            const pdfData = await pdf(fs.readFileSync(filePath));
            const formattedText = this.formatPdfText(pdfData.text);

            return {
              text: formattedText,
              name: file.originalname,
              type: 'pdf',
            };
          }

          // Handle Word (.docx) files
          if (fileType === '.docx') {
            // Ensure that the file path used is the actual file, not a directory
            const { value: text } = await mammoth.extractRawText({
              path: file.path,
            });

            return {
              text,
              name: file.originalname,
              type: 'docx',
            };
          }

          // Return error if file type is unsupported
        } catch (error) {
          return {
            error: `Error processing file ${file.originalname}: ${error.message}`,
          };
        }
      }),
    );

    const resumes = fileProcessingResults
      .map((result) => {
        return result.text;
      })
      .join(`\n-------------------------\n`);

    const result = await this.openaiService.getResumeRanking(
      resumes,
      job_description,
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
    // Replace multiple whitespace characters with a single space
    const cleanedText = rawText.replace(/\s+/g, ' ').trim();

    // Split the text into sentences based on common sentence delimiters
    const sentences = cleanedText.split(/(?<=[.!?])\s+/);

    // Format sentences
    const formattedSentences = sentences.map((sentence) => {
      // Capitalize the first letter of each sentence
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    });

    // Join the formatted sentences back into a single string
    return formattedSentences.join('\n\n');
  }
}
