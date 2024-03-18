import { describe, expect, it } from 'vitest';
import { InMemoryProductRepository } from './in-memory-product.repository';
import { Product } from '../../../../product/domain/entity/product';

const makeSut = () => ({
  sut: new InMemoryProductRepository(),
});

describe('InMemoryProductRepository', async () => {
  describe('list', () => {
    const { sut } = makeSut();
    sut['_items'] = [
      new Product({ description: 'Description Product 1', name: 'Product 1', price: 100 }),
      new Product({ description: 'Description Product 2', name: 'Product 2', price: 200 }),
      new Product({ description: 'Description Product 3', name: 'Product 3', price: 300 }),
      new Product({ description: 'Description Product 4', name: 'Product 4', price: 400 }),
      new Product({ description: 'Description Product 5', name: 'Product 5', price: 500 }),
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
        sortBy: 'price',
        sortDirection: 'asc',
        filters: { name: 'Product 1' },
      });

      // Assert
      expect(result).toEqual({
        currentPage: 1,
        items: [sut['_items'][0]],
        total: 1,
        perPage: 10,
      });
    });

    it('should return all items filtered by price', async () => {
      // Act
      const result = await sut.list({
        page: 1,
        perPage: 10,
        sortBy: 'price',
        sortDirection: 'asc',
        filters: { price: { min: 200, max: 400 } },
      });

      // Assert
      expect(result).toEqual({
        currentPage: 1,
        items: [sut['_items'][1], sut['_items'][2], sut['_items'][3]],
        total: 3,
        perPage: 10,
      });
    });

    it('should return items paginated', async () => {
      // Act
      const result = await sut.list({
        page: 1,
        perPage: 3,
        sortBy: 'price',
        sortDirection: 'asc',
      });

      // Assert
      expect(result).toEqual({
        currentPage: 1,
        items: [sut['_items'][0], sut['_items'][1], sut['_items'][2]],
        total: 5,
        perPage: 3,
      });
    });

    it('should return items sorted by price', async () => {
      // Act
      const result = await sut.list({
        page: 1,
        perPage: 10,
        sortBy: 'price',
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
  });
});