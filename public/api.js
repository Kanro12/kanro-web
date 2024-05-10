// Fungsi untuk mendapatkan daftar catatan dari API
async function getNotesFromAPI() {
    try {
        const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}

// Fungsi untuk membuat catatan baru pada API
async function createNoteOnAPI(title, body) {
    try {
        const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
}

// Fungsi untuk menghapus catatan dari API berdasarkan ID
async function deleteNoteFromAPI(id) {
    try {
        const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to delete note:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
}

// Fungsi untuk mengupdate catatan pada API berdasarkan ID
async function updateNoteOnAPI(id, title, body) {
    try {
        const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body }),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to update note:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
}
