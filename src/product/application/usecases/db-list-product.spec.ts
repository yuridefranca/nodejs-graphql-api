import { describe, expect, it, vi } from 'vitest';
import { DBListProduct } from './db-list-product';
import { ListProductRequest } from '../../domain/usecases';

const makeSut = () => {
  const listProductRepository = {
    list: vi.fn()
  };

  const sut = new DBListProduct(listProductRepository);

  return {
    sut,
    listProductRepository
  };
};

describe('List Product UseCase', async () => {
  it.each([
    {
      data: {
        filters: { name: 'Product 1' },
        page: 1,
        perPage: 10,
        sortBy: 'price',
        sortDirection: 'desc',
      } satisfies ListProductRequest,
      expeted: {
        filters: { name: 'Product 1' },
        page: 1,
        perPage: 10,
        sortBy: 'price',
        sortDirection: 'desc',
      }
    },
    {
      data: {} satisfies ListProductRequest,
      expeted: {
        filters: undefined,
        page: 1,
        perPage: 10,
        sortBy: 'name',
        sortDirection: 'asc',
      }
    }
  ])('should call listProductRepository with correct values', async ({ data, expeted }) => {
    // Arrange
    const { sut, listProductRepository } = makeSut();
    const request = data;

    // Act
    await sut.execute(request);

    // Assert
    expect(listProductRepository.list).toHaveBeenCalledWith(expeted);
  });
});