import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductGQL } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => ProductGQL)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Mutation(() => ProductGQL, { nullable: true })
  createProduct(@Args('input') input: CreateProductInput): Promise<ProductGQL> {
    try {
      return this.productsService.createProduct(input);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Query(() => [ProductGQL])
  products(): Promise<ProductGQL[]> {
    try {
      return this.productsService.findAllProducts();
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
  @Query(() => ProductGQL, { nullable: true })
  product(@Args('id', { type: () => ID }) id: number): Promise<ProductGQL> {
    try {
      return this.productsService.findProductById(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => ProductGQL, { nullable: true })
  updateProduct(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') input: UpdateProductInput,
  ): Promise<ProductGQL> {
    try {
      return this.productsService.updateProduct(id, input);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Mutation(() => ProductGQL, { nullable: true })
  deleteProduct(@Args('id', { type: () => ID }) id: number) {
    try {
      console.log(id);
      return this.productsService.removeProduct(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
