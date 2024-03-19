import { ListRepository } from '../../../shared/domain/repositories/list-base.repository';
import { Store } from '../entities/store';

export interface ListStoreRepository extends ListRepository<
  Store,
  Partial<Pick<Store, 'name'>>
> {
}
