import { Arg, ObjectType, Query, Resolver } from 'type-graphql';
import HttpResponse from '../../shared/presentation/http-response';
import { StoreType } from './store.type';
import { ListStore } from '../domain/usecases';
import { DbListStore } from '../application/usecases/db-list-store';
import { MongoStoreRepository } from '../infra/db/mongo/repositories/mongo-store.repository';

@ObjectType()
class ListStoreResponse extends HttpResponse(StoreType) { }

@Resolver()
export class ListStoreResolver {
  private readonly listStore: ListStore = new DbListStore(new MongoStoreRepository());

  @Query(returns => ListStoreResponse)
  async stores(
    // @Arg('filters', { nullable: true }) filters: any,
    @Arg('sortBy', { defaultValue: 'name', nullable: true }) sortBy: 'name',
    @Arg('sortDirection', { defaultValue: 'asc', nullable: true }) sortDirection: 'asc' | 'desc',
    @Arg('page', { defaultValue: 1, nullable: true }) page: number,
    @Arg('perPage', { defaultValue: 15, nullable: true }) perPage: number
  ) {
    const stores = await this.listStore.execute({ page, perPage, sortBy, sortDirection });
    return stores;
  }
}