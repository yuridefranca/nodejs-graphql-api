import { Store } from '../entities/store';

export type ListStoreRequest = {
  filters?: Partial<Pick<Store, 'name'>>;
  sortBy?: keyof Pick<Store, 'name'>;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
};

export type ListStoreResponse = {
  currentPage: number;
  items: Store[];
  total: number;
  perPage: number;
};

export interface ListStore {
  execute(request: ListStoreRequest): Promise<ListStoreResponse>;
}
