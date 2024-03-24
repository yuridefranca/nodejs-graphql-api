import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import mongoose from 'mongoose';

import { MongoStoreRepository } from './mongo-store.repository';
import { StoreModel } from '../models/mongo-store.model';
import * as MongoDB from '../../../../../shared/infra/db/mongo/mongo-connection';
import { Store } from '../../../../domain/entities/store';

const makeSut = () => ({
  sut: new MongoStoreRepository(),
});

describe.only('MongoStoreRepository', () => {
  beforeAll(async () => {
    await MongoDB.connect();
  });

  afterEach(async () => {
    const storeModel = mongoose.model('Store', StoreModel);
    await storeModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should list stores', async () => {
    // Arrange
    const { sut } = makeSut();
    const storeModel = mongoose.model('Store', StoreModel);
    const store = new Store({ address: '8043 Windler Roads', email: 'Brycen.Blanda53@example.net', id: 'd261cf86-eddc-41e3-93ba-947518e06a06', name: 'Rutherford, Lubowitz and Hintz', phone: '973.220.4051 x3547' });
    await storeModel.create({
      address: store.address,
      email: store.email,
      id: store.id,
      name: store.name,
      phone: store.phone,
    });

    // Act
    const result = await sut.list({ filters: {}, page: 1, perPage: 10, sortBy: 'name', sortDirection: 'asc' });

    // Assert
    expect(result).toMatchObject({
      currentPage: 1,
      items: [store],
      perPage: 10,
      total: 1,
    });
  });
});