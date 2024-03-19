import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class StoreType {
  @Field()
  address: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  phone: string;
}