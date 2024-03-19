import { InMemoryBaseRepository } from '../../../../shared/infra/db/in-memory/in-memory-base.repository';
import { Store } from '../../../domain/entities/store';

export class InMemoryStoreRepository extends InMemoryBaseRepository<
  Store,
  Partial<Pick<Store, 'name'>>
> {
  protected _items: Store[] = [];

  protected sortableFields: string[] = ['name'];

  protected filter(items: Store[], filters: Partial<Pick<Store, 'name'>>): Store[] {
    return items.filter(item => {
      if (filters.name && !item.name.includes(filters.name)) {
        return false;
      }

      return true;
    });
  }
}