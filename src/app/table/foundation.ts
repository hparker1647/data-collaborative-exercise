import { IData, ITableAdapter } from "./adapter";

export interface ITableFoundation {
  data: any[];
  header: IData[];
  initialize(): void;
}

export class TableFoundation implements ITableFoundation {
  private _data: any[] = [];
  private _header: IData[] = [];

  constructor(private _adapter: ITableAdapter) {

  }

  public initialize(): void {
    this._adapter.initialize();
  }

  public get data(): any[] {
    return this._data;
  }
  public set data(val: any[]) {
    if (this._data !== val) {
      this._data = val;
      this._setData(val);
    }
  }

  public get header(): IData[] {
    return this._header;
  }
  public set header(val: IData[]) {
    if (this._header !== val) {
      this._header = val;
      this._adapter.setHeader(val);
      this._setData(this._data);
    }
  }

  private _setData(data: any[]): void {
    this._adapter.setData(data.reduce((result: IData[][], row) => {
      let rData: IData[] = [];
      this._header.forEach(h => {
        rData.push({value: row[h.value]});
      });
      result.push(rData);
      return result;
    }, []));
  }
}
