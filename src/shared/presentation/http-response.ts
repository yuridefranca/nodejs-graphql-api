import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export default function HttpResponse<Entity extends object>(EntityClass: ClassType<Entity>) {
  @ObjectType()
  abstract class HttpResponseClass {
    @Field(type => Int)
    currentPage: number;

    @Field(type => [EntityClass])
    items: Entity[];

    @Field(type => Int)
    total: number;

    @Field(type => Int)
    perPage: number;
  }

  return HttpResponseClass;
};