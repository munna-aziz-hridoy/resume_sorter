import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { Job_Description_Response } from 'types/response';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_SECRET,
    });
  }

  async getResumeRanking(
    resume: string,
    job_description: string,
    resume_url: string,
  ): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4', // Use the standard GPT-4 model
        messages: [
          {
            role: 'system',
            content:
              'You are an AI assistant specialized in analyzing resumes and ranking them based on job description requirements.',
          },
          {
            role: 'user',
            content: `Job Description: ${job_description}.`,
          },
          {
            role: 'user',
            content: `Resumes: ${resume}.`,
          },
          {
            role: 'user',
            content: `Resume URLs: ${resume_url}.`,
          },
          {
            role: 'user',
            content: `Analyze the resume and rank him/her based on him/her relevance to the job description on a scale of 0-10. Also return result as JSON Array format only, nothing else. property will be\n'[{name: string, email: string, phone:string, rank: number education: string, university: string, job_experience: string, previous_company: string[], resume_url: resume_url}]',\nif do not find any of the property from resume, put "N/A".\nSometime you put an array on job_experience, do not do that. Strict to the type I've decleared on the format`,
          },
        ],
        temperature: 0.2,
        max_tokens: 3500,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      });

      const responseMessage = completion.choices[0].message.content;
      return responseMessage || 'No response received';
    } catch (error) {
      console.log(error);
      throw new Error('Error generating response');
    }
  }

  async getResumesRanking(
    resumes: string,
    job_description: string,
    resume_urls: string,
  ): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4', // Use the standard GPT-4 model
        messages: [
          {
            role: 'system',
            content:
              'You are an AI assistant specialized in analyzing resumes and ranking them based on job description requirements.',
          },
          {
            role: 'user',
            content: `Job Description: ${job_description}.`,
          },
          {
            role: 'user',
            content: `Resumes: ${resumes}.`,
          },
          {
            role: 'user',
            content: `Resume URLs: ${resume_urls}.`,
          },
          {
            role: 'user',
            content: `Analyze each resume and rank them based on their relevance to the job description on a scale of 0-10. Also return result as JSON Array format only, nothing else. property will be\n'[{name: string, email: string, phone:string, rank: number education: string, university: string, job_experience: string, previous_company: string[], resume_url: resume_url},...]',\nif do not find any of the property from resume, put "N/A".\nSometime you put an array on job_experience, do not do that. Strict to the type I've decleared on the format`,
          },
        ],
        temperature: 0.2,
        max_tokens: 3500,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      });

      const responseMessage = completion.choices[0].message.content;
      return responseMessage || 'No response received';
    } catch (error) {
      console.log(error);
      throw new Error('Error generating response');
    }
  }

  async getJobDescription(
    jobPostDto: CreateJobPostDto,
  ): Promise<Job_Description_Response> {
    const {
      role,
      company_name,
      responsibilities,
      qualifications,
      additional_requirements,
      salary,
      type,
      benefits,
      note,
      education,
    } = jobPostDto;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert HR assistant specialized in drafting job descriptions.',
          },
          {
            role: 'user',
            content: `Create a job description using the details below:
            Role: ${role}
            Company Name: ${company_name}
            Responsibilities: ${responsibilities}
            Qualifications: ${qualifications}
            Additional Requirements: ${additional_requirements}
            Benefits: ${benefits}
            Salary: ${salary}
            Type: ${type}
            Education; ${education}`,
          },
          {
            role: 'user',
            content: `${note}. Generate a professional and detailed job description that includes the company introduction, job responsibilities, required qualifications, additional requirements, and benefits if applicable. Also return as marked language. Just return the marked format of the job post, nothing else. I want to get the marked only to use it. Also return all the list with point`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.5,
      });

      const responseMessage = completion.choices[0].message.content;

      const response_data = {
        success: true,
        job_description: responseMessage || 'No response received',
      };

      return response_data;
    } catch (error) {
      console.log(error);
      throw new Error('Error generating response');
    }
  }
}
