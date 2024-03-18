import { Product } from '../entity/product';

export type ListProductRequest = {
  filters?: Partial<Pick<Product, 'name'> & { price: { min: number; max: number; }; }>;
  sortBy?: keyof Pick<Product, 'name' | 'price'>;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
};

export type ListProductResponse = {
  currentPage: number;
  items: Product[];
  total: number;
  perPage: number;
};

export interface ListProduct {
  execute(request: ListProductRequest): Promise<ListProductResponse>;
}