import { ListRepository } from '../../../shared/domain/repositories/list-base.repository';
import { Product } from '../entity/product';

export interface ListProductRepository extends ListRepository<
  Product,
  Partial<Pick<Product, 'name'> & { price: { max: number; min: number; }; }>
> {
}