// Define custom element for Note Item
class NoteItemElement extends HTMLElement {
    constructor() {
        super();
 
        // Create a shadow root
        this.attachShadow({ mode: 'open' });
 
        // Define the template
        this.shadowRoot.innerHTML = `
            <style>
                /* Add your styles here */
                .note-item {
                    margin-bottom: 1rem;
                    padding: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .note-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }
                .note-body {
                    color: #555;
                }
            </style>
            <div class="note-item">
                <div class="note-title"></div>
                <div class="note-body"></div>
            </div>
        `;
    }
 
    // Define getter and setter for title and body attributes
    set title(value) {
        this.setAttribute('title', value);
    }
 
    get title() {
        return this.getAttribute('title');
    }
 
    set body(value) {
        this.setAttribute('body', value);
    }
 
    get body() {
        return this.getAttribute('body');
    }
 
    // Called when the element is attached to the DOM
    connectedCallback() {
        this.shadowRoot.querySelector('.note-title').textContent = this.title;
        this.shadowRoot.querySelector('.note-body').textContent = this.body;
    }
}
 
// Define the custom element
customElements.define('note-item', NoteItemElement);