import React from 'react';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import Split from 'react-split';
import { nanoid } from 'nanoid';

const App = () => {
    const [notes, setNotes] = React.useState(
        () => JSON.parse(localStorage.getItem('notes')) || []
    );

    const [currentNoteID, setCurrentNoteID] = React.useState('');

    React.useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const createNewNote = () => {
        const newNote = {
            id: nanoid(),
            text: '',
        };
        setNotes((notes) => [newNote, ...notes]);
        setCurrentNoteID(newNote.id);
    };

    const findCurrentNote = () => {
        return notes.find((note) => note.id === currentNoteID) || notes[0];
    };

    const updateNote = (e) => {
        setNotes((notes) => {
            const newArr = [];
            for (let i = 0; i < notes.length; i++) {
                const note = notes[i];
                if (note.id === currentNoteID) {
                    newArr.unshift({ ...note, text: e.target.value });
                } else {
                    newArr.push(note);
                }
            }
            return newArr;
        });
    };

    const handleSelect = (selectedID) => {
        setCurrentNoteID((currentNoteID) => selectedID);
    };

    const handleDelete = (idToRemove) => {
        const filteredNoteArr = notes.filter((note) => note.id !== idToRemove);
        setNotes((notes) => filteredNoteArr);
    };

    return (
        <main>
            {notes.length > 0 ? (
                <Split sizes={[30, 70]} className='split'>
                    <Sidebar
                        notes={notes}
                        createNewNote={createNewNote}
                        currentNote={findCurrentNote()}
                        handleSelect={handleSelect}
                        handleDelete={handleDelete}
                    />
                    <Editor
                        currentNote={findCurrentNote()}
                        updateNote={updateNote}
                    />
                </Split>
            ) : (
                <div className='welcome-layer'>
                    <div>
                        <h2>You have no note !</h2>
                        <button onClick={createNewNote}>Create new note</button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default App;
