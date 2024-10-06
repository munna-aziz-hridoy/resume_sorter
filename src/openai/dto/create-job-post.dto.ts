import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateJobPostDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  education: string;

  @IsString()
  @IsNotEmpty()
  salary: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsArray()
  @IsNotEmpty()
  qualifications?: string;

  @IsArray()
  @IsNotEmpty()
  additional_requirements?: string;

  @IsArray()
  @IsNotEmpty()
  responsibilities?: string;

  @IsArray()
  @IsNotEmpty()
  benefits: string;

  @IsString()
  note: string;
}
