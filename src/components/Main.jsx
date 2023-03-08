import React, { memo, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Main({ activeNote, onUpdateNote }) {
  const [state, setState] = useState("");
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) {
    return <div className="no-active-note">Заметок нет</div>;
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />

        <CKEditor
          editor={ClassicEditor}
          data={`<p>${activeNote.body}</p>`}
          onChange={(_, data) => {
            setState(data.getData());
          }}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <div
          className="preview-body"
          dangerouslySetInnerHTML={{ __html: state }}
        />
      </div>
    </div>
  );
}

export default memo(Main);
