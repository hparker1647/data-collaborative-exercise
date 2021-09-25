import Express from 'express';
import { getNeoFeed } from "./nasa";

export function service(): Express.Router {
  const service = Express.Router();

  service.get('/neos', (req, res, next) => {
    getNeoFeed().then(result => {
      res.json(result);
    }).catch(next);
  });

  return service;
}
