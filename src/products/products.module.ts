import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGQL } from './entities/product.entity';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductGQL]), ImagesModule],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
