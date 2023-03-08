import React, { memo, useMemo } from "react";
import { getLastDate } from "../helpers/helpers";

function SideBar({
  notes,
  activeNote,
  setActiveNote,
  addOneNote,
  oneDeleteNote,
}) {
  const sortNotes = useMemo(
    () => [...notes].sort((a, b) => b.lastModified - a.lastModified),
    [notes]
  );
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Заметки</h1>
        <button onClick={addOneNote}>Добавить</button>
      </div>
      <ul className="app-sidebar-notes">
        {sortNotes.map((note) => (
          <li
            key={note.id}
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button onClick={() => oneDeleteNote(note.id)}>Удалить</button>
            </div>
            <p className={"noteBody"}>{note.body}</p>
            <small className="note-meta">
              last modified {getLastDate(note.lastModified)}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(SideBar);
