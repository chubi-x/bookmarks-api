import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  description?;
}
