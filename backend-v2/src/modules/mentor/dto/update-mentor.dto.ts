import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMentorDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  name?: string;

  @IsOptional()
  @IsString()
  mobile_number?: string;

  @IsOptional()
  @IsString()
  college?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  branch?: string;

  @IsOptional()
  @IsNumber()
  grad_year?: number;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  linkedin_url?: string;

  @IsOptional()
  @IsString()
  insta_url?: string;

  @IsOptional()
  @IsString()
  currentCompany?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  profile_pic?: string;
}
