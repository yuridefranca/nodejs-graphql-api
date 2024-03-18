import { Product } from '../../../../product/domain/entity/product';
import { ListProductRepository } from '../../../../product/domain/repositories';
import { InMemoryBaseRepository } from '../../../../shared/infra/db/in-memory/in-memory-base.repository';

export class InMemoryProductRepository extends InMemoryBaseRepository<
  Product,
  Partial<Pick<Product, 'name'> & { price: { max: number; min: number; }; }>
> implements ListProductRepository {
  protected _items: Product[] = [
    new Product({ description: 'Description Product 1', name: 'Product 1', price: 10, },),
    new Product({ description: 'Description Product 2', name: 'Product 2', price: 20, }),
  ];

  protected sortableFields: string[] = ['name', 'price'];

  protected filter(items: Product[], filters: Pick<Product, 'name'> & { price: { max: number; min: number; }; }): Product[] {
    return items.filter(item => {
      if (filters.name && !item.name.includes(filters.name)) {
        return false;
      }

      if (filters.price) {
        if (filters.price.min && item.price < filters.price.min) {
          return false;
        }

        if (filters.price.max && item.price > filters.price.max) {
          return false;
        }
      }

      return true;
    });
  }
}