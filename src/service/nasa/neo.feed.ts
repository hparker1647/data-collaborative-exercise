import { IEstimatedDiameter, INeoFeedQueryParameters, Velocity } from '.';
import { buildQueryParams, INearEarthObject, mean } from '../../shared';
import { jsonFetch } from '../util';
import { INeoFeedResponse, INeoFeedObject, Units } from './models';

export function getNeoFeed(param?: INeoFeedQueryParameters): Promise<INearEarthObject[]> {
  return jsonFetch<INeoFeedResponse>(`https://api.nasa.gov/neo/rest/v1/feed?${buildQueryParams({ api_key: process.env.NASA_API_KEY, ...param })}`, {
    method: 'GET'
  }).then(response => {
    return Object.keys(response.near_earth_objects).reduce((result: INearEarthObject[], neoDate) => {
      if (response.near_earth_objects[neoDate]) {
        response.near_earth_objects[neoDate]!.forEach(neo => {
          result.push(fromNasaNeo(neo));
        });
      }
      return result;
    }, []);
  });
}

function fromNasaNeo(obj: INeoFeedObject): INearEarthObject {
  const velocities: number[] = [];
  const missDistances: number[] = [];
  const approachTimes: number[] = [];
  obj.close_approach_data.forEach(c => {
    let v = Number(c.relative_velocity[Velocity.KPH]);
    let d = Number(c.miss_distance[Units.Kilometers]);
    let a = Number(c.epoch_date_close_approach);
    if (!isNaN(v)) {
      velocities.push(v);
    }
    if (!isNaN(d)) {
      missDistances.push(d);
    }
    if (!isNaN(a)) {
      approachTimes.push(a);
    }
  });
  return {
    id: obj.id,
    name: obj.name,
    diameter: getEstimatedDiameter(obj.estimated_diameter[Units.Meters]),
    hazardous: obj.is_potentially_hazardous_asteroid === true,
    sentry: obj.is_sentry_object === true,
    velocity: mean(velocities),
    missDistance: mean(missDistances),
    visualMagnitude: obj.absolute_magnitude_h,
    approachDateTime: Math.floor(mean(approachTimes))
  }
}

function getEstimatedDiameter(estimated: IEstimatedDiameter | undefined): number {
  return estimated ?
    mean([estimated.estimated_diameter_min, estimated.estimated_diameter_max]) :
    NaN;
}
