import { Arg, ObjectType, Query, Resolver } from 'type-graphql';

import { ProductType } from './product.type';
import { ListProduct } from '../domain/usecases';
import { DBListProduct } from '../application/usecases/db-list-product';
import { InMemoryProductRepository } from '../infra/db/in-memory/in-memory-product.repository';
import HttpResponse from '../../shared/presentation/http-response';

@ObjectType()
class ListProductResponse extends HttpResponse(ProductType) { }

@Resolver()
export class ListProductResolver {
  private readonly listProduct: ListProduct = new DBListProduct(new InMemoryProductRepository());

  @Query(returns => ListProductResponse)
  async products(
    // @Arg('filters', { nullable: true }) filters: any,
    @Arg('sortBy', { defaultValue: 'name', nullable: true }) sortBy: 'name' | 'price',
    @Arg('sortDirection', { defaultValue: 'asc', nullable: true }) sortDirection: 'asc' | 'desc',
    @Arg('page', { defaultValue: 1, nullable: true }) page: number,
    @Arg('perPage', { defaultValue: 15, nullable: true }) perPage: number
  ) {
    const products = await this.listProduct.execute({ page, perPage, sortBy, sortDirection });
    return products;
  }
}