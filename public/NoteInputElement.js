class NoteInputElement extends HTMLElement {
    constructor() {
        super();
        // Create a shadow root
        this.attachShadow({ mode: 'open' });
        // Define the template
        this.shadowRoot.innerHTML = `
            <style>
                /* Add your styles here */
                .note-input {
                    margin: 1rem 0;
                    padding: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    position: relative; /* Add position relative */
                }
                .note-input input[type="text"],
                .note-input textarea {
                    width: 100%;
                    padding: 0.5rem;
                    margin-bottom: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                }
                .note-input button {
                    padding: 0.5rem 1rem;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                }
                .note-input button:hover {
                    background-color: #0056b3;
                }
                .loading-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.7);
                    display: none;
                    justify-content: center;
                    align-items: center;
                }
                .loading-overlay .loader {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    animation: spin 1s linear infinite;
                }
            </style>
            <div class="note-input">
                <input id="noteTitle" type="text" placeholder="Title">
                <textarea id="noteBody" placeholder="Enter your note"></textarea>
                <button id="addNoteButton">Add Note</button>
                <div class="loading-overlay">
                    <div class="loader"></div>
                </div>
            </div>
        `;
    }
 
    connectedCallback() {
        // Get input elements
        const titleInput = this.shadowRoot.getElementById('noteTitle');
        const bodyInput = this.shadowRoot.getElementById('noteBody');
        const addButton = this.shadowRoot.getElementById('addNoteButton');
        const loadingOverlay = this.shadowRoot.querySelector('.loading-overlay');
 
        // Event listener for Add Note button click
        addButton.addEventListener('click', async () => {
            const title = titleInput.value;
            const body = bodyInput.value;
 
            // Validate input
            if (title.trim() === '' || body.trim() === '') {
                alert('Please enter both title and body for the note.');
                return;
            }
 
            // Show loading overlay
            loadingOverlay.style.display = 'flex';
 
            try {
                // Simulate server request (replace this with actual server request)
                // Dispatch custom event to notify the addition of a new note
                this.dispatchEvent(new CustomEvent('note-added', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        title,
                        body
                    }
                }));
 
                // Clear input fields after adding note (after a short delay for demonstration)
                setTimeout(() => {
                    titleInput.value = '';
                    bodyInput.value = '';
                    // Hide loading overlay after a short delay (for demonstration)
                    loadingOverlay.style.display = 'none';
                }, 1000); // Simulate server request with a delay of 1 second
            } catch (error) {
                console.error('Error adding note:', error);
                // Hide loading overlay on error
                loadingOverlay.style.display = 'none';
            }
        });
 
        // Fetch data from server when the component is connected to the DOM
        this.fetchDataFromServer(loadingOverlay);
    }
 
    async fetchDataFromServer(loadingOverlay) {
        // Show loading overlay
        loadingOverlay.style.display = 'flex';
 
        try {
            // Fetch data from server (replace this with actual fetch request)
            const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
            const data = await response.json();
            console.log('Data fetched:', data);
            // Handle the fetched data here (e.g., render it on the page)
 
            // Hide loading overlay after fetching data
            loadingOverlay.style.display = 'none';
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors (e.g., display error message)
            // Hide loading overlay on error as well
            loadingOverlay.style.display = 'none';
        }
    }
}
 
// Fungsi untuk menangani event 'note-added'
function handleNoteAdded(event) {
    const noteData = event.detail;
 
    // Menampilkan data catatan yang ditambahkan
    console.log('New Note Added:');
    console.log('Title:', noteData.title);
    console.log('Body:', noteData.body);
 
    // Buat elemen baru untuk catatan
    const noteCard = document.createElement('div');
    const noteId = 'note_' + Date.now(); // Generate unique ID
    noteCard.id = noteId;
    noteCard.classList.add('note-card');
    noteCard.innerHTML = `
        <h3>${noteData.title}</h3>
        <p>${noteData.body}</p>
        <button class="delete-button" data-id="${noteId}" data-title="${noteData.title}" data-body="${noteData.body}">Delete</button>
    `;
 
    // Tambahkan catatan ke dalam daftar
    const noteList = document.getElementById('noteList'); // Assuming you have a container element with id 'noteList'
    noteList.appendChild(noteCard);
 
    // Tambahkan event listener untuk tombol hapus
    const deleteButton = noteCard.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        const id = deleteButton.getAttribute('data-id');
        const title = deleteButton.getAttribute('data-title');
        const body = deleteButton.getAttribute('data-body');
        // Show loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.classList.add('loading-overlay');
        loadingOverlay.innerHTML = `
            <div class="loader"></div>
        `;
        noteCard.appendChild(loadingOverlay);
 
        // Dispatch custom event to notify the removal of the note
        document.dispatchEvent(new CustomEvent('note-removed', {
            bubbles: true,
            composed: true,
            detail: {
                id,
                title,
                body
            }
        }));
 
        // Hapus indikator loading setelah jeda
        setTimeout(() => {
            loadingOverlay.remove();
        }, 1000);
    });
}
 
// Fungsi untuk menangani event 'note-removed'
function handleNoteRemoved(event) {
    const noteId = event.detail.id;
    const noteTitle = event.detail.title;
    const noteBody = event.detail.body;
 
    // Cari elemen catatan berdasarkan ID
    const noteToRemove = document.getElementById(noteId);
 
    // Hapus catatan jika ditemukan
    if (noteToRemove) {
        noteToRemove.remove();
        console.log('Note removed:');
        console.log('Title:', noteTitle);
        console.log('Body:', noteBody);
    } else {
        console.log('Note with ID:', noteId, 'not found.');
    }
}
 
// Menangkap event 'note-removed'
document.addEventListener('note-removed', handleNoteRemoved);
 
// Menangkap event 'note-added'
document.addEventListener('note-added', handleNoteAdded);
 
// Define the custom element
customElements.define('note-input', NoteInputElement);