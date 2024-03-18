import { ListRepository, ListRepositoryRequest, ListRepositoryResponse } from '../../../../shared/domain/repositories/list-base.repository';

export abstract class InMemoryBaseRepository<
  RepositoryEntity,
  Filters = Partial<RepositoryEntity>,
  SortBy = keyof Required<Filters>
> implements ListRepository<
  RepositoryEntity,
  Filters,
  SortBy
> {
  protected _items: RepositoryEntity[] = [];

  protected sortableFields: string[] = [];

  async list({ page, perPage, sortBy, sortDirection, filters }: ListRepositoryRequest<RepositoryEntity, Filters, SortBy>): Promise<ListRepositoryResponse<RepositoryEntity>> {
    const items = filters ? this.filter(this._items, filters) : this._items;
    const sortedItems = this.sort(items, sortBy, sortDirection);
    const paginatedItems = this.paginate(sortedItems, page, perPage);

    return {
      currentPage: page,
      items: paginatedItems,
      total: items.length,
      perPage: perPage,
    };
  }

  protected abstract filter(items: RepositoryEntity[], filters: Filters): RepositoryEntity[];

  private paginate(items: RepositoryEntity[], page: number, perPage: number): RepositoryEntity[] {
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return items.slice(start, end);
  }

  private sort(items: RepositoryEntity[], sortBy: SortBy, sortDirection: 'asc' | 'desc'): RepositoryEntity[] {
    if (!sortBy || !this.sortableFields.includes(sortBy as any)) {
      throw new Error('Invalid field to sort');
    }

    return [...items].sort((a, b) => {
      if ((a as any)[sortBy as any] > (b as any)[sortBy]) {
        return sortDirection === 'asc' ? 1 : -1;
      }

      if ((a as any)[sortBy] < (b as any)[sortBy]) {
        return sortDirection === 'asc' ? -1 : 1;
      }

      return 0;
    });
  }
}