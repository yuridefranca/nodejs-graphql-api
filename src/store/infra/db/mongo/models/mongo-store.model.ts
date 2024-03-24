import { Schema } from 'mongoose';

export const StoreModel = new Schema({
  address: String,
  email: String,
  id: String,
  name: String,
  phone: String,
});