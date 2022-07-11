import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  title: string;

  @IsUrl()
  url: string;
  @IsNumber()
  userId;
  @IsString()
  description?;
}
