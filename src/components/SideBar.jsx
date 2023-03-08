import React from 'react';
import uuid from "react-uuid";

function SideBar({notes, activeNote, setActiveNote,addOneNote,oneDeleteNote}) {

    const sortNotes = notes.sort((a,b) => b.lastModified - a.lastModified)

    return (
        <div className='app-sidebar'>
            <div className="app-sidebar-header">
                <h1>Заметки</h1>
                <button onClick={addOneNote}>Добавить</button>
            </div>
                <div className="app-sidebar-notes">
                    {sortNotes.map(note => (
                        <div className={`app-sidebar-note ${note.id === activeNote && 'active'}`} onClick={() => setActiveNote(note.id)}>
                            <div className="sidebar-note-title">
                                <strong>{note.title}</strong>
                                <button onClick={() => oneDeleteNote(note.id)}>Удалить</button>
                            </div>
                            <p>{note.body && note.body.substr(0,100) + '...'}</p>
                            <small className='note-meta'>
                                last modified {new Date(note.lastModified).toLocaleDateString('en-GB', {
                                    hour: '2-digit',
                                minute: '2-digit'
                            })}
                            </small>
                        </div>
                    ))}

                </div>
        </div>
    );
}

export default SideBar;