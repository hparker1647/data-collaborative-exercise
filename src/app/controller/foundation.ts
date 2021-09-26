import { INearEarthObject } from "../../shared";
import { IControllerAdapter } from "./adapter";

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

    this._fetchNeos().then(neos => {
      this._adapter.table.data = neos;
    });
  }

  private _fetchNeos(): Promise<IHydratedNeo[]> {
    // return fetch(`${location.protocol}//${location.host}:1234/neos`, { method: 'GET'}).then(response => {
    return fetch(`api/neos`, { method: 'GET'}).then(response => {
      if (response.ok) {
        return response.json().then((neos: INearEarthObject[]) => {
          return neos.reduce((result: IHydratedNeo[], n) => {
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
    });
  }
}
