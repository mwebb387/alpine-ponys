import Ponys from 'https://cdn.jsdelivr.net/gh/jhuddle/ponys/miniature-ponys.js';

function AlpineComponent(element) {
  return (class extends element {
    constructor() {
      super();
      this.data = this.data.bind(this);
    }

    data() {
      let data = {};
      this.dataProps?.forEach?.(prop => data[prop] = this[prop]);
      return data;
    }

    connectedCallback() {
      let root = this.disabledFeatures?.includes?.('shadow') ? this : this.shadowRoot;
      if (this.components?.length) {
        ponyUpComponents(this.components);
      }

      Alpine.initTree(root);
    }
  });
}

export function setup(root) {

  root.AlpineComponent = AlpineComponent;

  root.ponyUpComponents = componentList => {
    componentList.forEach(cmp => {
      if (!customElements.get(cmp.toLowerCase())) {
        Ponys.import(cmp.toLowerCase(), `./components/${cmp.toLowerCase()}.html`);
      }
    });
  }

  root.document.querySelectorAll('[w-component]').forEach(cmp => {
    if (!customElements.get(cmp.tagName.toLowerCase())) {
      Ponys.import(cmp.tagName.toLowerCase(), `./components/${cmp.tagName.toLowerCase()}.html`);
    }
  });
}