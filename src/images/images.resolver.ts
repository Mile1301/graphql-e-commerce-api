import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { ImageGQL } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => ImageGQL)
export class ImagesResolver {
  constructor(private imagesService: ImagesService) {}

  @Mutation(() => ImageGQL, { nullable: true })
  createImage(@Args('input') input: CreateImageInput): Promise<ImageGQL> {
    try {
      return this.imagesService.create(input);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Query(() => [ImageGQL])
  images(): Promise<ImageGQL[]> {
    try {
      return this.imagesService.findAllImages();
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Query(() => ImageGQL, { nullable: true })
  image(@Args('id', { type: () => ID }) id: number): Promise<ImageGQL> {
    try {
      return this.imagesService.findImageById(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => ImageGQL, { nullable: true })
  updateImage(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') input: UpdateImageInput,
  ) {
    try {
      return this.imagesService.updateImage(id, input);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Mutation(() => ImageGQL, { nullable: true })
  deleteImage(@Args('id', { type: () => ID }) id: number) {
    try {
      return this.imagesService.removeImage(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
