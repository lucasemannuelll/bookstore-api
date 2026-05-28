import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm'

import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

import { Author } from '../authors/entities/author.entity';
import { Tag } from '../tags/entities/tag.entity'


@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,

        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,

        @InjectRepository(Tag)
        private tagsRepository: Repository<Tag>,
    ) {}

    async create(createBookDto: CreateBookDto) {
        const author = await this.authorsRepository.findOneBy({
            id: createBookDto.authorId,
        });

        if(!author) {
            throw new NotFoundException(`Author with ID ${createBookDto.authorId} not found`);
        }

        const tags = await this.tagsRepository.find({
            where: {
                id: In(createBookDto.tagIds),
            }
        });

        const book = this.booksRepository.create({
            title: createBookDto.title,
            releaseYear: createBookDto.releaseYear,
            author,
            tags,
        });

        return this.booksRepository.save(book);
    }

    findAll() {
        return this.booksRepository.find({
            relations: { author: true, tags: true }
        });
    }
}
