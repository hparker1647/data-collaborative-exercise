import { buildQueryParams, dateKeyToDate, IGetNeoFeedResponse, INearEarthObject, INeoFeedQueryParameters, mean } from '../../shared';
import { jsonFetch } from '../util';
import { INeoFeedResponse, INeoFeedObject, Units, Velocity, IEstimatedDiameter } from './models';

export function getNeoFeed(param?: INeoFeedQueryParameters): Promise<IGetNeoFeedResponse> {
  let startDate: Date | undefined = dateKeyToDate((param || {}).start_date);
  let endDate: Date | undefined = dateKeyToDate((param || {}).end_date);
  return jsonFetch<INeoFeedResponse>(`https://api.nasa.gov/neo/rest/v1/feed?${buildQueryParams({ api_key: process.env.NASA_API_KEY, ...param })}`, {
    method: 'GET'
  }).then(response => {
    return Object.keys(response.near_earth_objects).reduce((result: IGetNeoFeedResponse, neoDate) => {
      if (response.near_earth_objects[neoDate]) {
        let currDate = dateKeyToDate(neoDate)!;
        if (startDate === undefined || startDate > currDate) {
          startDate = currDate;
          result.query.start_date = neoDate;
        }
        if (endDate === undefined || endDate < currDate) {
          endDate = currDate;
          result.query.end_date = neoDate;
        }
        response.near_earth_objects[neoDate]!.forEach(neo => {
          result.objects.push(fromNasaNeo(neo));
        });
      }
      return result;
    }, { query: param || {}, objects: []});
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
