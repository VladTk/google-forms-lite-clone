import { formResolver } from './formResolver';
import { responseResolver } from './responseResolver';

export const resolvers = {
  Query: {
    ...formResolver.Query,
    ...responseResolver.Query,
  },
  Mutation: {
    ...formResolver.Mutation,
    ...responseResolver.Mutation,
  },
};
