import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  biography: string;

  @IsUrl()
  website: string;

  @IsNumber()
  authorId: number;
}
