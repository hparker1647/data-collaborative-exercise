
export interface IDictionary<T> {
    [index: string]: T | undefined
}

export interface INearEarthObject {
  id: string;
  name: string;
  /** Estimated diameter in meters. */
  diameter: number;
  hazardous: boolean;
  sentry: boolean;
  /** Estimated velocity in km/h */
  velocity: number;
  /** The miss distance in km */
  missDistance: number;
  visualMagnitude: number;
  /** The datetime of close approach, in ms from epoch. */
  approachDateTime: number;
}

export interface INeoFeedQueryParameters {
  /** YYYY-MM-DD */
  start_date?: string,
  /** YYYY-MM-DD */
  end_date?: string,
  api_key?: string
}

export interface IGetNeoFeedResponse {
  query: INeoFeedQueryParameters;
  objects: INearEarthObject[];
}
