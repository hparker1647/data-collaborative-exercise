import Express from 'express';
import { dateKeyRegex, INeoFeedQueryParameters } from '../shared';
import { getNeoFeed } from "./nasa";

export function service(): Express.Router {
  const service = Express.Router();

  service.get('/neos', (req, res, next) => {
    const queryParams: INeoFeedQueryParameters = {};
    if (req.query) {
      if (typeof req.query.start_date === 'string' && dateKeyRegex.test(req.query.start_date)) {
        queryParams.start_date = req.query.start_date;
      }
      if (typeof req.query.end_date === 'string' && dateKeyRegex.test(req.query.end_date)) {
        queryParams.end_date = req.query.end_date;
      }
    }
    getNeoFeed(queryParams).then(result => {
      res.json(result);
    }).catch(next);
  });

  return service;
}
