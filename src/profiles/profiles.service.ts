import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

import { Author } from '../authors/entities/author.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,

    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create (createProfileDto: CreateProfileDto) {
    const author = await this.authorsRepository.findOneBy({
        id: createProfileDto.authorId,
    });

    if (!author) {
        throw new NotFoundException(`Author with ID ${createProfileDto.authorId} not found`);
    }

    const profile = this.profilesRepository.create({
        biography: createProfileDto.biography,
        website: createProfileDto.website,
        author,
    });

    return this.profilesRepository.save(profile);
  }

  findAll() {
    return this.profilesRepository.find({
        relations: {
            author: true
        }
    });
  }
}