import { IDictionary } from "./models";

export function buildQueryParams(params: IDictionary<any>): string {
  return Object.keys(params).reduce((query, key) => {
    return `${query}${query.length > 0 ? '&' : ''}${key}=${params[key]}`
  }, '');
}
