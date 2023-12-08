import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ProductGQL } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ImageGQL {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column()
  url: string;

  @Field(() => Int, { defaultValue: 1000 })
  @Column({ default: 1000 })
  priority: number;

  @Field(() => ProductGQL, { nullable: true })
  @ManyToOne(() => ProductGQL, (product) => product.images, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  product: ProductGQL;
}
