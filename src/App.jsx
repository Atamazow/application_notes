import React, {useEffect, useState} from "react";
import "./App.css";
import uuid from "react-uuid";
import SideBar from "./components/SideBar";
import Main from "./components/Main";

function App(props) {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
    const getActiveNote = () => {
      return notes.find(note => note.id === activeNote)
    }

    const addOneNote = () => {
        const newNote = {
            id: uuid(),
            title: 'Новая заметка',
            body: '',
            lastModified: Date.now()
        }
        setNotes([newNote,...notes])
    }
    const oneDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id))
    }
    const onUpdateNote = (updateNote) => {
        const updateNotesArray = notes.map(note => {
            if(note.id === activeNote) {
                return updateNote
            }
            return  note
        })
        setNotes(updateNotesArray)
    }
  return (
    <div className="App">
      <SideBar
        notes={notes}
        addOneNote={addOneNote}
        setActiveNote={setActiveNote}
        activeNote={activeNote}
        oneDeleteNote={oneDeleteNote}
      />
      <Main onUpdateNote={onUpdateNote} activeNote={getActiveNote()} />
    </div>
  );
}

export default App;
