import { MDCDataTable } from '@material/data-table';

export interface IData {
  label?: string;
  value: any;
}

export interface ITableAdapter {
  initialize(): void;
  setData(data: IData[][]): void;
  setHeader(cols: IData[]): void;
}

export class TableAdapter implements ITableAdapter {
  private _mdcTable: MDCDataTable | undefined;
  private _tableBody: HTMLTableSectionElement | undefined;
  private _tableHeaderRow: HTMLTableRowElement | undefined;

  constructor(private _component: HTMLElement) {}

  public initialize(): void {
    if (!this._mdcTable) {
      this._mdcTable = new MDCDataTable(this._component.shadowRoot!.querySelector('.mdc-data-table')!);
    }
  }

  public setData(data: IData[][]): void {
    this.tableBody.innerHTML = '';
    data.forEach(row => {
      this.tableBody.appendChild(this._buildDataRow(row));
    });
  }

  public setHeader(cols: IData[]): void {
    this.tableHeaderRow.innerHTML = '';
    cols.forEach(col => {
      let th = document.createElement('th');
      th.className = 'md-data-table__header-cell';
      th.innerHTML = col.label || col.value;
      this.tableHeaderRow.appendChild(th);
    });
  }

  public get tableBody(): HTMLTableSectionElement {
    if (!this._tableBody) {
      this._tableBody = this._component.shadowRoot!.querySelector<HTMLTableSectionElement>('table > tbody')!;
    }
    return this._tableBody!;
  }

  public get tableHeaderRow(): HTMLTableRowElement {
    if (!this._tableHeaderRow) {
      this._tableHeaderRow = this._component.shadowRoot!.querySelector<HTMLTableRowElement>('table > thead > tr')!;
    }
    return this._tableHeaderRow;
  }

  private _buildDataRow(columns: IData[]): HTMLTableRowElement {
    const row = document.createElement('tr');
    columns.forEach(col => {
      let td = document.createElement('td');
      td.className = 'mdc-data-table__cell';
      td.innerText = col.value;
      switch (typeof col.value) {
        case 'number':
          td.classList.add('mdc-data-table__cell--numeric');
          break;
        case 'object':
          if (col.value instanceof Date) {
            td.innerText = col.value.toLocaleString();
          }
          break;
      }
      row.appendChild(td);
    });
    return row;
  }
}
