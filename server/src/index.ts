import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
import { seedData } from './seed';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

seedData();

app.listen(PORT, () =>
  console.log(`Server ready at http://localhost:${PORT}/graphql`),
);
