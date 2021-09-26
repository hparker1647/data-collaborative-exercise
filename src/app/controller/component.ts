import { ControllerAdapter } from "./adapter";
import { ControllerFoundation, IControllerFoundation } from "./foundation";

export class ControllerComponent {
  private _foundation: IControllerFoundation;

  constructor() {
    this._foundation = new ControllerFoundation(new ControllerAdapter());
  }
}
