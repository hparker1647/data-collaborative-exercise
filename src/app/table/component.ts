import { createShadowDom, ICustomElementCallbacks } from "../util";
import { IData, TableAdapter } from "./adapter";
import { ITableFoundation, TableFoundation } from "./foundation";

const templateString = require('./template.html').default;
const stylesString = require('./styles.scss').default[0][1];

export interface ITableComponent extends ICustomElementCallbacks, HTMLElement {
  header: IData[];
  data: any[];
}

export class TableComponent extends HTMLElement implements ITableComponent {
  private _foundation: ITableFoundation;

  constructor() {
    super();
    createShadowDom(this, templateString, stylesString);
    this._foundation = new TableFoundation(new TableAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public get data(): any[] {
    return this._foundation.data;
  }
  public set data(val: any[]) {
    this._foundation.data = val;
  }

  public get header(): IData[] {
    return this._foundation.header;
  }
  public set header(val: IData[]) {
    this._foundation.header = val;
  }
}
