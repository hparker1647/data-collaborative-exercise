
export interface ICustomElementCallbacks {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  attributeChangedCallback?(attrName: string, oldVal: string, newVal: string): void;
  adoptedCallback?(): void;
}

export function createShadowDom(element: HTMLElement, templateString: string, stylesString?: string) {
  const template = new DOMParser().parseFromString(templateString, 'text/html').querySelector('template');
  if (template) {
    const shadow = element.attachShadow({mode: 'open'});
    if (stylesString) {
      const styles = document.createElement('style');
      styles.innerHTML = stylesString;
      shadow.appendChild(styles);
    }
    shadow.appendChild(template.content.cloneNode(true));
  }
}

export function defineCustomElement(name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void {
  window.customElements.define(name, constructor, options)
}

export function upgradeProperty(obj: any, prop: string): void {
  if (obj.hasOwnProperty(prop)) {
    let value = obj[prop];
    delete obj[prop];
    obj[prop] = value;
  }
}
