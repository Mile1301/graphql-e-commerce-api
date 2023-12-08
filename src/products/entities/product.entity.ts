import {
  ObjectType,
  Field,
  Int,
  ID,
  registerEnumType,
  Float,
} from '@nestjs/graphql';
import { ImageGQL } from 'src/images/entities/image.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

registerEnumType(ProductStatus, { name: 'ProductStatus' });

@ObjectType()
@Entity()
export class ProductGQL {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Field(() => ProductStatus, { defaultValue: ProductStatus.ACTIVE })
  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @Field(() => [ImageGQL], { nullable: true })
  @OneToMany(() => ImageGQL, (image) => image.product)
  images: ImageGQL[];
}
