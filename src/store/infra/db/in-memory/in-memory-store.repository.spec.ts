import { describe, expect, it } from 'vitest';
import { InMemoryStoreRepository } from './in-memory-store.repository';
import { Store } from '../../../domain/entities/store';

const makeSut = () => ({
  sut: new InMemoryStoreRepository(),
});

describe('InMemoryStoreRepository', () => {
  describe('list', () => {
    const { sut } = makeSut();
    sut['_items'] = [
      new Store({ address: 'Address Store 1', email: 'Adele.Kling93@example.com', name: 'Store 1', phone: '(740) 706-9059' }),
      new Store({ address: 'Address Store 2', email: 'Mallory98@example.org', name: 'Store 2', phone: '343-438-6603' }),
      new Store({ address: 'Address Store 3', email: 'Georgette98@example.net', name: 'Store 3', phone: '1-672-589-0054 x043' }),
      new Store({ address: 'Address Store 4', email: 'Wilson.Herman@example.org', name: 'Store 4', phone: '1-800-123-4567' }),
      new Store({ address: 'Address Store 5', email: 'Stephany66@example.com', name: 'Store 5', phone: '(534) 599-9202' }),
    ];

    it('should return all items', async () => {
      // Act
      const result = await sut.list({
        page: 1,
        perPage: 10,
        sortBy: 'name',
        sortDirection: 'asc',
      });

      // Assert
      expect(result).toEqual({
        currentPage: 1,
        items: sut['_items'],
        total: 5,
        perPage: 10,
      });
    });

    it('should return all items filtered by name', async () => {
      // Act
      const result = await sut.list({
        page: 1,
        perPage: 10,
        sortBy: 'name',
        sortDirection: 'asc',
        filters: { name: 'Store 1' },
      });

      // Assert
      expect(result).toEqual({
        currentPage: 1,
        items: [sut['_items'][0]],
        total: 1,
        perPage: 10,
      });
    });

    it('should return items paginated', async () => {
      // Act
      const result = await sut.list({
        page: 1,
        perPage: 2,
        sortBy: 'name',
        sortDirection: 'asc',
      });

      // Assert
      expect(result).toEqual({
        currentPage: 1,
        items: [sut['_items'][0], sut['_items'][1]],
        total: 5,
        perPage: 2,
      });
    });

    it('should return items sorted by name', async () => {
      // Act
      const result = await sut.list({
        page: 1,
        perPage: 10,
        sortBy: 'name',
        sortDirection: 'desc',
      });

      // Assert
      expect(result).toEqual({
        currentPage: 1,
        items: [...sut['_items']].reverse(),
        total: 5,
        perPage: 10,
      });
    });
  });
});