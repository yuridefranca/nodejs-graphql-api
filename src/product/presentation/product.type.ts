import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ProductType {
  @Field()
  description: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  price: number;
}