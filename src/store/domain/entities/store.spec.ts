import { describe, expect, it } from 'vitest';
import { Store } from './store';

describe('Store', () => {
  describe('constructor', () => {
    it.each([
      {
        data: {
          address: 'Store 1 address',
          email: 'store1@mail.com',
          name: 'Store 1',
          phone: '789-949-5087'
        },
        expected: {
          address: 'Store 1 address',
          email: 'store1@mail.com',
          name: 'Store 1',
          phone: '789-949-5087'
        }
      },
      {
        data: {
          address: 'Store 2 address',
          email: 'store2@mail.com',
          name: 'Store 2',
          phone: '1-925-545-7743 x65994'
        },
        expected: {
          address: 'Store 2 address',
          email: 'store2@mail.com',
          name: 'Store 2',
          phone: '1-925-545-7743 x65994'
        },
      }
    ])('should instantiate a new store and set the properties properly', ({ data, expected }) => {
      // Act
      const store = new Store(data);

      // Assert
      expect(store.address).toBe(expected.address);
      expect(store.email).toBe(expected.email);
      expect(store.id).toBeDefined();
      expect(store.name).toBe(expected.name);
      expect(store.phone).toBe(expected.phone);
    });
  });

  describe('address', () => {
    it('should return the address', () => {
      // Arrange
      const store = new Store({
        address: 'Store 1 address',
        email: 'store1@mail.com',
        name: 'Store 1',
        phone: '789-949-5087'
      });

      // Act
      const result = store.address;

      // Assert
      expect(result).toBe('Store 1 address');
    });

    it('should set the address', () => {
      // Arrange
      const store = new Store({
        address: 'Store 1 address',
        email: 'store1@mail.com',
        name: 'Store 1',
        phone: '789-949-5087'
      });
    });
  });

  describe('id', () => {
    it('should return the id', () => {
      // Arrange
      const store = new Store({
        address: 'Store 1 address',
        email: 'store1@mail.com',
        name: 'Store 1',
        phone: '789-949-5087'
      });

      // Act
      const result = store.id;

      // Assert
      expect(result).toBeDefined();
    });
  });

  describe('name', () => {
    it('should return the name', () => {
      // Arrange
      const store = new Store({
        address: 'Store 1 address',
        email: 'store1@mail.com',
        name: 'Store 1',
        phone: '789-949-5087'
      });

      // Act
      const result = store.name;

      // Assert
      expect(result).toBe('Store 1');
    });

    it('should set the name', () => {
      // Arrange
      const store = new Store({
        address: 'Store 1 address',
        email: 'store1@mail.com',
        name: 'Store 1',
        phone: '789-949-5087'
      });

      // Act
      store.name = 'New name';

      // Assert
      expect(store.name).toBe('New name');
    });
  });

  describe('phone', () => {
    it('should return the phone', () => {
      // Arrange
      const store = new Store({
        address: 'Store 1 address',
        email: 'store1@mail.com',
        name: 'Store 1',
        phone: '789-949-5087'
      });

      // Act
      const result = store.phone;

      // Assert
      expect(result).toBe('789-949-5087');
    });

    it('should set the phone', () => {
      // Arrange
      const store = new Store({
        address: 'Store 1 address',
        email: 'store1@mail.com',
        name: 'Store 1',
        phone: '789-949-5087'
      });

      // Act
      store.phone = 'New phone';

      // Assert
      expect(store.phone).toBe('New phone');
    });
  });
});