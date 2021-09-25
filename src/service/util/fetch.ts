import { RequestInit } from "node-fetch";
import fetch from 'node-fetch';

export function jsonFetch<T = any>(url: string, init?: RequestInit): Promise<T> {
  return fetch(url, init).then(response => {
    try {
      return response.json();
    } catch (e) {
      return response.text().then(JSON.parse)
    }
  });
}
