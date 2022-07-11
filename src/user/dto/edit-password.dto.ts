import { IsNotEmpty, IsString } from 'class-validator';

export class EditUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
