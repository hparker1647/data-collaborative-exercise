import { Button } from '@material/mwc-button';
import { LinearProgress } from '@material/mwc-linear-progress';
import { TextField } from '@material/mwc-textfield';
import { ITableComponent } from "../table";

export interface IControllerAdapter {
  fromDate: string;
  fromDateField: TextField;
  loading: boolean;
  queryButton: Button;
  table: ITableComponent;
  toDate: string;
  toDateField: TextField;
}

export class ControllerAdapter implements IControllerAdapter {
  private _fromDateField: TextField | undefined;
  private _queryButton: Button | undefined;
  private _linearProgress: LinearProgress | undefined;
  private _table: ITableComponent | undefined;
  private _toDateField: TextField | undefined;

  constructor() {}

  public get fromDate(): string {
    return this.fromDateField.value;
  }
  public set fromDate(val: string) {
    this.fromDateField.value = val;
  }

  public get fromDateField(): TextField {
    if (!this._fromDateField) {
      this._fromDateField = document.querySelector<TextField>('mwc-textfield[label="From Date"]')!;
    }
    return this._fromDateField;
  }

  public get queryButton(): Button {
    if (!this._queryButton) {
      this._queryButton = document.querySelector<Button>('mwc-button[label="QUERY"]')!;
    }
    return this._queryButton;
  }

  public get linearProgress(): LinearProgress {
    if (!this._linearProgress) {
      this._linearProgress = document.querySelector<LinearProgress>('mwc-linear-progress[indeterminate]')!;
    }
    return this._linearProgress;
  }

  public get loading(): boolean {
    return !this.linearProgress.closed;
  }
  public set loading(val: boolean) {
    this.linearProgress.closed = val !== true;
  }

  public get table(): ITableComponent {
    if (!this._table) {
      this._table = document.querySelector<ITableComponent>('example-table')!;
    }
    return this._table;
  }

  public get toDate(): string {
    return this.toDateField.value;
  }
  public set toDate(val: string) {
    this.toDateField.value = val;
  }

  public get toDateField(): TextField {
    if (!this._toDateField) {
      this._toDateField = document.querySelector<TextField>('mwc-textfield[label="To Date"]')!;
    }
    return this._toDateField;
  }
}
