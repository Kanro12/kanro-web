async function getNotesFromAPI() {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
    if (!response.ok) {
        throw new Error('Failed to fetch notes');
    }
    const data = await response.json();
    return data;
}

async function displayNotes() {
    try {
        const noteList = document.getElementById('note-list');
        noteList.innerHTML = '';

        const notesData = await getNotesFromAPI();
        notesData.data.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');

            const titleElement = document.createElement('h2');
            titleElement.textContent = note.title;

            const bodyElement = document.createElement('p');
            bodyElement.textContent = note.body;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                try {
                    await deleteNoteFromAPI(note.id);
                    await displayNotes();
                } catch (error) {
                    console.error('Error deleting note:', error);
                }
            });

            noteElement.appendChild(titleElement);
            noteElement.appendChild(bodyElement);
            noteElement.appendChild(deleteButton);

            noteList.appendChild(noteElement);
        });
    } catch (error) {
        console.error('Error fetching and displaying notes:', error);
    }
}

async function createNoteOnAPI(title, body) {
    // Implementasi tetap sama
}

async function deleteNoteFromAPI(id) {
    // Implementasi tetap sama
}

async function updateNoteOnAPI(id, title, body) {
    // Implementasi tetap sama
}
