import { defineCustomElement } from "../util";
import { ITableComponent, TableComponent } from "./component";

export function defineTableCustomElement(): void {
  defineCustomElement('example-table', TableComponent);
}

export { ITableComponent, TableComponent }
