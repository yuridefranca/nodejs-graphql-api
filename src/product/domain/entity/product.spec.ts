import { describe, expect, it } from 'vitest';
import { Product } from './product';

describe('Product', () => {
  describe('constructor', () => {
    it.each([
      {
        data: {
          description: 'Product 1 description',
          name: 'Product 1',
          price: 100
        },
        expected: {
          description: 'Product 1 description',
          name: 'Product 1',
          price: 100
        }
      },
      {
        data: {
          description: 'Product 2 description',
          name: 'Product 2',
          price: 200
        },
        expected: {
          description: 'Product 2 description',
          name: 'Product 2',
          price: 200
        }
      }
    ])('should instantiate a new product and set the properties properly', ({ data, expected }) => {
      // Act
      const product = new Product(data);

      // Assert
      expect(product.description).toBe(expected.description);
      expect(product.id).toBeDefined();
      expect(product.name).toBe(expected.name);
      expect(product.price).toBe(expected.price);
    });
  });

  describe('description', () => {
    it('should return the description', () => {
      // Arrange
      const product = new Product({
        description: 'Product 1 description',
        name: 'Product 1',
        price: 100
      });

      // Act
      const result = product.description;

      // Assert
      expect(result).toBe('Product 1 description');
    });

    it('should set the description', () => {
      // Arrange
      const product = new Product({
        description: 'Product 1 description',
        name: 'Product 1',
        price: 100
      });

      // Act
      product.description = 'New description';

      // Assert
      expect(product.description).toBe('New description');
    });
  });

  describe('id', () => {
    it('should return the id', () => {
      // Arrange
      const product = new Product({
        description: 'Product 1 description',
        name: 'Product 1',
        price: 100
      });

      // Act
      const result = product.id;

      // Assert
      expect(result).toBeDefined();
    });
  });

  describe('name', () => {
    it('should return the name', () => {
      // Arrange
      const product = new Product({
        description: 'Product 1 description',
        name: 'Product 1',
        price: 100
      });

      // Act
      const result = product.name;

      // Assert
      expect(result).toBe('Product 1');
    });

    it('should set the name', () => {
      // Arrange
      const product = new Product({
        description: 'Product 1 description',
        name: 'Product 1',
        price: 100
      });

      // Act
      product.name = 'New name';

      // Assert
      expect(product.name).toBe('New name');
    });
  });

  describe('price', () => { 
    it('should return the price', () => {
      // Arrange
      const product = new Product({
        description: 'Product 1 description',
        name: 'Product 1',
        price: 100
      });

      // Act
      const result = product.price;

      // Assert
      expect(result).toBe(100);
    });

    it('should set the price', () => {
      // Arrange
      const product = new Product({
        description: 'Product 1 description',
        name: 'Product 1',
        price: 100
      });

      // Act
      product.price = 200;

      // Assert
      expect(product.price).toBe(200);
    });
  });
});