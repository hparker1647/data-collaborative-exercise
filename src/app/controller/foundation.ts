import { buildQueryParams, dateKeyRegex, dateKeyToDate, dateToDateKey, IGetNeoFeedResponse, INearEarthObject, INeoFeedQueryParameters } from "../../shared";
import { IControllerAdapter } from "./adapter";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export interface IHydratedNeo extends Omit<INearEarthObject, 'approachDateTime'> {
  approachDateTime: Date;
}

export interface IControllerFoundation {

}

export class ControllerFoundation implements IControllerFoundation {
  private _initialized: boolean = false;
  constructor(private _adapter: IControllerAdapter) {
    document.addEventListener('readystatechange', event => {
      if (document.readyState === 'complete' && !this._initialized) {
        this._initialized = true;
        this._initialize();
      }
    });
  }

  private _initialize(): void {
    this._adapter.table.header = [
      {
        label: 'Name',
        value: 'name'
      }, {
        label: 'Diameter',
        value: 'diameter'
      }, {
        label: 'Hazardous',
        value: 'hazardous'
      }, {
        label: 'Sentry',
        value: 'sentry'
      }, {
        label: 'Velocity',
        value: 'velocity'
      }, {
        label: 'Miss Distance',
        value: 'missDistance'
      }, {
        label: 'Visual Magnitude',
        value: 'visualMagnitude'
      }, {
        label: 'Approach Date/Time',
        value: 'approachDateTime'
      }
    ];

    this._adapter.fromDateField.addEventListener('blur', () => {
      if (dateKeyRegex.test(this._adapter.fromDate.trim()) && dateKeyRegex.test(this._adapter.toDate.trim())) {
        const from = dateKeyToDate(this._adapter.fromDate.trim());
        const to = dateKeyToDate(this._adapter.toDate.trim());
        if (from && to) {
          if (from > to) {
            this._adapter.fromDate = dateToDateKey(to);
            this._adapter.toDate = dateToDateKey(from);
          }
          if ((to.getTime() - from.getTime()) > SEVEN_DAYS) {
            this._adapter.toDate = dateToDateKey(new Date(from.getTime() + SEVEN_DAYS));
          }
        }
      }
    });

    this._adapter.toDateField.addEventListener('blur', () => {
      if (dateKeyRegex.test(this._adapter.fromDate.trim()) && dateKeyRegex.test(this._adapter.toDate.trim())) {
        const from = dateKeyToDate(this._adapter.fromDate.trim());
        const to = dateKeyToDate(this._adapter.toDate.trim());
        if (from && to) {
          if (from > to) {
            this._adapter.fromDate = dateToDateKey(to);
            this._adapter.toDate = dateToDateKey(from);
          }
          if ((to.getTime() - from.getTime()) > SEVEN_DAYS) {
            this._adapter.fromDate = dateToDateKey(new Date(to.getTime() - SEVEN_DAYS));
          }
        }
      }
    });
    this._adapter.queryButton.addEventListener('click', () => {
      this._fetchNeos().then(neos => this._adapter.table.data = neos);
    });

    this._fetchNeos().then(neos => this._adapter.table.data = neos);
  }

  private _fetchNeos(): Promise<IHydratedNeo[]> {
    const query: INeoFeedQueryParameters = {};
    if (dateKeyRegex.test(this._adapter.fromDate.trim())) {
      query.start_date = this._adapter.fromDate.trim();
    }
    if (dateKeyRegex.test(this._adapter.toDate.trim())) {
      query.end_date = this._adapter.toDate.trim();
    }
    this._adapter.loading = true;
    return fetch(`api/neos?${buildQueryParams(query)}`, { method: 'GET' }).then(response => {
      if (response.ok) {
        return response.json().then((neos: IGetNeoFeedResponse) => {
          this._adapter.fromDate = neos.query.start_date || '';
          this._adapter.toDate = neos.query.end_date || '';
          return neos.objects.reduce((result: IHydratedNeo[], n) => {
            result.push({
              ...n,
              approachDateTime: new Date(n.approachDateTime)
            });
            return result;
          }, []);
        });
      } else {
        return [];
      }
    }).finally(() => this._adapter.loading = false);
  }
}
