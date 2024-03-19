import { InMemoryBaseRepository } from '../../../../shared/infra/db/in-memory/in-memory-base.repository';
import { Store } from '../../../domain/entities/store';

export class InMemoryStoreRepository extends InMemoryBaseRepository<
  Store,
  Partial<Pick<Store, 'name'>>
> {
  protected _items: Store[] = [
    new Store({ address: '8043 Windler Roads', email: 'Brycen.Blanda53@example.net', name: 'Rutherford, Lubowitz and Hintz', phone: '973.220.4051 x3547' }),
    new Store({ address: '230 Marta Turnpike', email: 'Bryana42@example.org', name: 'Becker, Wyman and Romaguera', phone: '898.633.3900' }),
    new Store({ address: '57949 Kohler Row', email: 'Adolph95@yahoo.com', name: 'Monahan LLC', phone: '671-594-3381 x4743' }),
  ];

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