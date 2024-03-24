import mongoose, { Schema } from 'mongoose';
import { ListRepositoryRequest, ListRepositoryResponse } from '../../../../../shared/domain/repositories/list-base.repository';
import { Store } from '../../../../domain/entities/store';
import { ListStoreRepository } from '../../../../domain/repositories';
import { StoreModel } from '../models/mongo-store.model';

export class MongoStoreRepository implements ListStoreRepository {
  private readonly mongooseModel = mongoose.model('Store', StoreModel);

  async list({ filters, page, perPage, sortBy, sortDirection }: ListRepositoryRequest<Store, Partial<Pick<Store, 'name'>>, 'name'>): Promise<ListRepositoryResponse<Store>> {
    const stores = await this.mongooseModel.find({});

    return {
      currentPage: page,
      items: (stores).map(store => new Store({
        address: store.address!,
        email: store.email!,
        id: store.id!,
        name: store.name!,
        phone: store.phone!,
      })),
      perPage,
      total: stores.length,
    };
  }
}