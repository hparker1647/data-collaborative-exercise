
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
  visualMagnitude: string;
  /** The datetime of close approach, in ms from epoch. */
  approachDateTime: number;
}
