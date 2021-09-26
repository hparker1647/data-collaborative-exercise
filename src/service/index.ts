import { resolve } from 'path';
import * as Express from 'express';
import { service } from './service';

const app = Express.default();

app.use('/?$', (req, res, next) => {
  res.sendFile(resolve(__dirname, 'index.html'));
});
app.use('/api', service());
app.use('/:file', (req, res, next) => {
  res.sendFile(resolve(__dirname, req.params.file));
});

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
});
