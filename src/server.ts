import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import express from 'express';

import { ListProductResolver } from './product/presentation/list-product.resolver';
import { ListStoreResolver } from './store/presentation';

const schema = await buildSchema({
  resolvers: [
    ListProductResolver,
    ListStoreResolver,
  ],
});

const app = express();

const server = new ApolloServer({ schema });

await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {}),
);

const PORT = process.env.PORT || 3000;
app.listen({ port: PORT }, () => {
  console.info(`🚀 Server ready at http://localhost:${PORT}`);
});

export const viteNodeApp = app;