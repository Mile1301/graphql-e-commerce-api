import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ProductStatus } from '../entities/product.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsString()
  @Length(3, 30)
  name: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => ProductStatus)
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @Field(() => [Int])
  @IsArray()
  imageIds: number[];
}
