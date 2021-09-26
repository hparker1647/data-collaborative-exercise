import { ITableComponent } from "../table";

export interface IControllerAdapter {
  table: ITableComponent;
}

export class ControllerAdapter implements IControllerAdapter {
  private _table: ITableComponent | undefined;

  constructor() {}

  public get table(): ITableComponent {
    if (!this._table) {
      this._table = document.querySelector<ITableComponent>('example-table')!;
    }
    return this._table;
  }
}
