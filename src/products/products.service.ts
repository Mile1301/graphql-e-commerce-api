import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductGQL } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductGQL) private productsRepo: Repository<ProductGQL>,
    private imagesService: ImagesService,
  ) {}
  async createProduct(productData: CreateProductInput): Promise<ProductGQL> {
    try {
      const { imageIds, ...otherData } = productData;
      const images = await Promise.all(
        imageIds.map(async (imageId) => {
          const image = await this.imagesService.findImageById(imageId);
          return image;
        }),
      );

      const newProduct = this.productsRepo.create({
        ...otherData,
        images: images,
      });
      await this.productsRepo.save(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  findAllProducts(): Promise<ProductGQL[]> {
    try {
      return this.productsRepo.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findProductById(id: number): Promise<ProductGQL | undefined> {
    try {
      const product = await this.productsRepo.findOne({
        where: { id },
        relations: {
          images: true,
        },
      });
      if (!product) throw new NotFoundException('Product not found!');
      return product;
    } catch (error) {
      console.error(`Error finding product by id ${id}:`, error);
      throw new NotFoundException(`Product with id ${id} not found!`);
    }
  }

  async updateProduct(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<ProductGQL> {
    try {
      const productToUpdate = await this.findProductById(id);
      Object.assign(productToUpdate, updateProductInput);

      if (updateProductInput.imageIds) {
        const images = await Promise.all(
          updateProductInput.imageIds.map(async (imageId) => {
            const image = await this.imagesService.findImageById(imageId);
            return image;
          }),
        );
        productToUpdate.images = images;
      }

      await this.productsRepo.save(productToUpdate);
      return productToUpdate;
    } catch (error) {
      console.log(error);
    }
  }

  async removeProduct(id: number) {
    try {
      const productToDelete = await this.findProductById(id);
      await this.productsRepo.remove(productToDelete);
    } catch (error) {
      console.log(error);
    }
  }
}
