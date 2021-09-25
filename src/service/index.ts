import * as Express from 'express';
import { service } from './service';

const app = Express.default();

app.use('/', service());

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
});
