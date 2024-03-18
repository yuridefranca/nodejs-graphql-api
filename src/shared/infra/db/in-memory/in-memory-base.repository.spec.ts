import { describe, expect, it } from 'vitest';
import { InMemoryBaseRepository } from './in-memory-base.repository';

class StubEntity {
  constructor(public id: string, public name: string, public price: number) { }
}

class StubInMemoryBaseRepository extends InMemoryBaseRepository<StubEntity, Partial<StubEntity>> {
  protected _items: StubEntity[] = [
    new StubEntity('1', 'Product 1', 100),
    new StubEntity('2', 'Product 2', 200),
    new StubEntity('3', 'Product 3', 300),
    new StubEntity('4', 'Product 4', 400),
    new StubEntity('5', 'Product 5', 500),
  ];

  protected sortableFields: string[] = ['price'];

  protected filter(items: StubEntity[], filters: Pick<StubEntity, 'name' | 'price'>): StubEntity[] {
    return items.filter(item => {
      if (filters.name && !item.name.includes(filters.name)) {
        return false;
      }

      if (filters.price && item.price !== filters.price) {
        return false;
      }

      return true;
    });
  }
}

const makeSut = () => {
  return {
    sut: new StubInMemoryBaseRepository(),
  };
};

describe('InMemoryBaseRepository', () => {

  describe('list', () => {
    describe('filters', () => {
      it('should return all items if no filter is provided', async () => {
        // Arrange
        const { sut } = makeSut();

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
          items: [
            new StubEntity('1', 'Product 1', 100),
            new StubEntity('2', 'Product 2', 200),
            new StubEntity('3', 'Product 3', 300),
            new StubEntity('4', 'Product 4', 400),
            new StubEntity('5', 'Product 5', 500),
          ],
          total: 5,
          perPage: 10,
        });
      });

      it('should return only items that match the filter', async () => {
        // Arrange
        const { sut } = makeSut();

        // Act
        const result = await sut.list({
          page: 1,
          perPage: 10,
          sortBy: 'price',
          sortDirection: 'asc',
          filters: {
            name: 'Product 3',
          },
        });

        // Assert
        expect(result).toEqual({
          currentPage: 1,
          items: [
            new StubEntity('3', 'Product 3', 300),
          ],
          total: 1,
          perPage: 10,
        });
      });
    });

    describe('pagination', () => {
      it('should return the first page of items', async () => {
        // Arrange
        const { sut } = makeSut();

        // Act
        const result = await sut.list({
          page: 1,
          perPage: 2,
          sortBy: 'price',
          sortDirection: 'asc',
        });

        // Assert
        expect(result).toEqual({
          currentPage: 1,
          items: [
            new StubEntity('1', 'Product 1', 100),
            new StubEntity('2', 'Product 2', 200),
          ],
          total: 5,
          perPage: 2,
        });
      });

      it('should return the second page of items', async () => {
        // Arrange
        const { sut } = makeSut();

        // Act
        const result = await sut.list({
          page: 2,
          perPage: 2,
          sortBy: 'price',
          sortDirection: 'asc',
        });

        // Assert
        expect(result).toEqual({
          currentPage: 2,
          items: [
            new StubEntity('3', 'Product 3', 300),
            new StubEntity('4', 'Product 4', 400),
          ],
          total: 5,
          perPage: 2,
        });
      });
    });

    describe('sorting', () => { 
      it('should sort items by price ascending', async () => {
        // Arrange
        const { sut } = makeSut();

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
          items: [
            new StubEntity('1', 'Product 1', 100),
            new StubEntity('2', 'Product 2', 200),
            new StubEntity('3', 'Product 3', 300),
            new StubEntity('4', 'Product 4', 400),
            new StubEntity('5', 'Product 5', 500),
          ],
          total: 5,
          perPage: 10,
        });
      });

      it('should sort items by price descending', async () => {
        // Arrange
        const { sut } = makeSut();

        // Act
        const result = await sut.list({
          page: 1,
          perPage: 10,
          sortBy: 'price',
          sortDirection: 'desc',
        });

        // Assert
        expect(result).toEqual({
          currentPage: 1,
          items: [
            new StubEntity('5', 'Product 5', 500),
            new StubEntity('4', 'Product 4', 400),
            new StubEntity('3', 'Product 3', 300),
            new StubEntity('2', 'Product 2', 200),
            new StubEntity('1', 'Product 1', 100),
          ],
          total: 5,
          perPage: 10,
        });
      });
    });
  });
});