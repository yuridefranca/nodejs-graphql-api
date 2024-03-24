import mongoose, { ConnectOptions } from 'mongoose';

const mongoUri = 'mongodb://user:password@mongo:27017';

const options = {
  dbName: 'development',
} satisfies ConnectOptions;

export const connect = async () => {
  await mongoose.connect(mongoUri, options);
};

export const connection = mongoose.connection;

export const disconnect = async () => {
  await mongoose.disconnect();
};
