import '@material/mwc-button';
import '@material/mwc-linear-progress';
import '@material/mwc-textfield';
import '@material/mwc-top-app-bar-fixed';
import { ControllerComponent } from "./controller";
import { defineTableCustomElement } from "./table";

defineTableCustomElement();
new ControllerComponent();

const stylesString = require('./styles.scss').default[0][1];
const styles = document.createElement('style');
styles.innerHTML = stylesString;
document.querySelector('head')!.appendChild(styles);