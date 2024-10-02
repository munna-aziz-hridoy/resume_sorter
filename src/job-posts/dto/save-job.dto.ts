import { IsString, IsNotEmpty } from 'class-validator';

export class SaveJobDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  job_description: string;

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
  user_id: string;
}
