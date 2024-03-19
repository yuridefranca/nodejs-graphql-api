import { ListStoreRepository } from '../../domain/repositories';
import { ListStore, ListStoreRequest, ListStoreResponse } from '../../domain/usecases';

export class DbListStore implements ListStore {
  constructor(private readonly listStoreRepository: ListStoreRepository) { }

  async execute({ filters, page, perPage, sortBy, sortDirection }: ListStoreRequest): Promise<ListStoreResponse> {
    return this.listStoreRepository.list({
      filters: filters,
      page: page ? page : 1,
      perPage: perPage ? perPage : 10,
      sortBy: sortBy ? sortBy : 'name',
      sortDirection: sortDirection ? sortDirection : 'asc',
    });
  }
}