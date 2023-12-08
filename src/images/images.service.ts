import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageGQL } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageGQL) private imagesRepo: Repository<ImageGQL>,
  ) {}

  async create(imageData: CreateImageInput): Promise<ImageGQL> {
    const newImage = this.imagesRepo.create(imageData);
    await this.imagesRepo.save(newImage);
    return newImage;
  }

  findAllImages(): Promise<ImageGQL[]> {
    try {
      return this.imagesRepo.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findImageById(id: number): Promise<ImageGQL> {
    try {
      const image = await this.imagesRepo.findOneBy({ id });
      if (!image)
        throw new NotFoundException(`Product with id ${id} not found!`);
      return image;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Product with id ${id} not found!`);
    }
  }

  async updateImage(id: number, updateData: UpdateImageInput) {
    try {
      const imageToUpdate = await this.findImageById(id);
      Object.assign(imageToUpdate, updateData);
      await this.imagesRepo.save(imageToUpdate);
    } catch (error) {
      console.error(error);
    }
  }

  async removeImage(id: number) {
    try {
      const imageToDelete = await this.findImageById(id);
      await this.imagesRepo.remove(imageToDelete);
    } catch (error) {
      console.error(error);
    }
  }
}
