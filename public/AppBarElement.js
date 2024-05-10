// Define custom element for AppBar
class AppBarElement extends HTMLElement {
    constructor() {
        super();
 
        // Create a shadow root
        this.attachShadow({ mode: 'open' });
 
        // Define the template
        this.shadowRoot.innerHTML = `
 
            
        `;
    }
}
 
// Define the custom element
customElements.define('app-bar', AppBarElement);