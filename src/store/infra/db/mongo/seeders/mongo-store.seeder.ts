import mongoose from 'mongoose';
import { StoreModel } from '../models/mongo-store.model';

const data = [
  { address: '8043 Windler Roads', email: 'Brycen.Blanda53@example.net', id: '938dc854-62c5-4f9f-b1b1-65bc6c663802', name: 'Rutherford, Lubowitz and Hintz', phone: '973.220.4051 x3547' },
  { address: '230 Marta Turnpike', email: 'Bryana42@example.org', id: '0730608d-bfd8-42ad-98c9-7a678e1d79bb', name: 'Becker, Wyman and Romaguera', phone: '898.633.3900' },
  { address: '57949 Kohler Row', email: 'Adolph95@yahoo.com', id: '5e0c3c6c-3c3c-430f-917c-c745783d232c', name: 'Monahan LLC', phone: '671-594-3381 x4743' },
];

export class MongoStoreSeeder {

  static run() {
    const mongooseModel = mongoose.model('Store', StoreModel);
    
    mongooseModel.deleteMany({});
    mongooseModel.insertMany(data);
  }
}