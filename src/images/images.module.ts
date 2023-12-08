import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageGQL } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageGQL])],
  providers: [ImagesResolver, ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
