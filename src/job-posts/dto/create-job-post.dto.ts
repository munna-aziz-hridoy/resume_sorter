import { IsString, IsNotEmpty } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  qualifications?: string;

  @IsString()
  @IsNotEmpty()
  additional_requirements?: string;

  @IsString()
  @IsNotEmpty()
  responsibilities?: string;

  @IsString()
  @IsNotEmpty()
  benefits: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  note: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
