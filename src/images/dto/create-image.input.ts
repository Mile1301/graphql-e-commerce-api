import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateImageInput {
  @Field(() => String)
  @IsString()
  url: string;

  @Field(() => Int)
  @IsNumber()
  priority: number;
}
