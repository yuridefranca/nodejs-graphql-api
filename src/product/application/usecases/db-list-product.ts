import { ListProductRepository } from '../../domain/repositories';
import { ListProduct, ListProductRequest, ListProductResponse } from '../../domain/usecases';

export class DBListProduct implements ListProduct {
  constructor(private readonly listProductRepository: ListProductRepository) { }

  async execute({ filters, page, perPage, sortBy, sortDirection }: ListProductRequest): Promise<ListProductResponse> {
    return this.listProductRepository.list({
      page: page ? page : 1,
      perPage: perPage ? perPage : 10,
      sortBy: sortBy ? sortBy : 'name',
      sortDirection: sortDirection ? sortDirection : 'asc',
      filters: filters,
    });
  }
}