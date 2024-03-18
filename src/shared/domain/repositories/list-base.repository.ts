export type ListRepositoryRequest<
  ListRepositoryEntity,
  ListRepositoryFilters = Partial<ListRepositoryEntity>,
  ListRepositorySortBy = keyof Required<ListRepositoryFilters>
> = {
  filters?: ListRepositoryFilters;
  sortBy: ListRepositorySortBy;
  sortDirection: 'asc' | 'desc';
  page: number;
  perPage: number;
};

export type ListRepositoryResponse<ListRepositoryEntity> = {
  currentPage: number;
  items: ListRepositoryEntity[];
  total: number;
  perPage: number;
};

export interface ListRepository<
  ListRepositoryEntity,
  ListRepositoryFilters = Partial<ListRepositoryEntity>,
  ListRepositorySortBy = keyof Required<ListRepositoryFilters>
> {
  list(request: ListRepositoryRequest<ListRepositoryEntity, ListRepositoryFilters, ListRepositorySortBy>): Promise<ListRepositoryResponse<ListRepositoryEntity>>;
};