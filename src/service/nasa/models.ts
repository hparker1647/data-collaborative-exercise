import { IDictionary } from "../../shared";

export enum Units {
  Astronomical = 'astronomical',
  Lunar = 'lunar',
  Kilometers = 'kilometers',
  Meters = 'meters',
  Miles = 'miles',
  Feet = 'feet'
}

export enum Velocity {
  KPS = 'kilometers_per_second',
  KPH = 'kilometers_per_hour',
  MPH = 'miles_per_hour'
}

export interface INeoFeedResponse {
  links: INeoFeedLinks;
  element_count: 24;
  near_earth_objects: IDictionary<INeoFeedObject[]>;
}

export interface INeoFeedLinks {
  next?: string;
  prev?: string;
  self: string;
}

export interface INeoFeedObject {
  links: INeoFeedLinks;
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  /** A dictionary of `Units`:`IEstimatedDiameter` */
  estimated_diameter: IDictionary<IEstimatedDiameter>;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: ICloseApproachData[];
  is_sentry_object: boolean;
}

export interface IEstimatedDiameter {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}

export interface ICloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  /** A dictionary of `Velocity`: `string`, where the value is a stringified `number` */
  relative_velocity: IDictionary<string>;
  /** A dictionary of `Units`: `string`, where the value is a stringified `number` */
  miss_distance: IDictionary<string>;
  orbiting_body: string;
}

