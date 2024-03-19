import { describe, expect, it, vi } from 'vitest';
import { DbListStore } from './db-list-store';
import { ListStoreRequest } from '../../domain/usecases';

const makeSut = () => {
  const listStoreRepository = {
    list: vi.fn()
  };

  const sut = new DbListStore(listStoreRepository);

  return {
    sut,
    listStoreRepository
  };
};

describe('List Store UseCase', async () => {
  it.each([
    {
      data: {
        filters: { name: 'Store 1' },
        page: 1,
        perPage: 10,
        sortBy: 'name',
        sortDirection: 'desc',
      } satisfies ListStoreRequest,
      expeted: {
        filters: { name: 'Store 1' },
        page: 1,
        perPage: 10,
        sortBy: 'name',
        sortDirection: 'desc',
      },
    },
    {
      data: {} satisfies ListStoreRequest,
      expeted: {
        filters: undefined,
        page: 1,
        perPage: 10,
        sortBy: 'name',
        sortDirection: 'asc',
      }
    }
  ])('should call listStoreRepository with correct values', async ({ data, expeted }) => { 
    // Arrange
    const { sut, listStoreRepository } = makeSut();
    const request = data;

    // Act
    await sut.execute(request);

    // Assert
    expect(listStoreRepository.list).toHaveBeenCalledWith(expeted);
  });
});