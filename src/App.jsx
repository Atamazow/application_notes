import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import uuid from "react-uuid";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [activeNote, setActiveNote] = useState(notes[0]?.id || null);

  const notesMap = useMemo(
    () => notes.reduce((acc, el) => ({ ...acc, [el.id]: el }), {}),
    [notes]
  );

  const getActiveNote = useMemo(
    () => notesMap[activeNote],
    [notesMap, activeNote]
  );

  const addOneNote = useCallback(() => {
    const newNote = {
      id: uuid(),
      title: "Новая заметка",
      body: "",
      status: false,
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
  }, [notes]);
  const oneDeleteNote = useCallback(
    (id) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    },
    [notes]
  );

  const onUpdateNote = useCallback(
    (updateNote) => {
      const updateNotesArray = notes.map((note) => {
        if (note.id === activeNote) {
          return updateNote;
        }
        return note;
      });
      setNotes(updateNotesArray);
    },
    [notes, activeNote]
  );
  return (
    <div className="App">
      <SideBar
        notes={notes}
        addOneNote={addOneNote}
        setActiveNote={setActiveNote}
        activeNote={activeNote}
        oneDeleteNote={oneDeleteNote}
      />
      <Main onUpdateNote={onUpdateNote} activeNote={getActiveNote} />
    </div>
  );
}

export default App;
