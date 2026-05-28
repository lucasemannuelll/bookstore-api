import {
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsNumber,
} from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    title!: string;

    @IsNumber()
    releaseYear!: number;

    @IsNumber()
    authorId!: number;

    @IsArray()
    @ArrayNotEmpty()
    tagIds!: number[];
}