import React from 'react';
import NoteCard from './common/NoteCard';
import CommonButton from './common/Button';

const Notes = ({ notes, onDelete, onEdit }) => {
  if (!Array.isArray(notes) || notes.length === 0) {
    return <div>No notes found.</div>;
  }
  return (
    <div>
      {notes.map((note, idx) => (
        <NoteCard
          key={note._id}
          title={note.title}
          content={note.body}
          actions={
            <>
              <CommonButton color="primary" size="small" onClick={() => onEdit(note)} sx={{ mr: 1 }}>
                Edit
              </CommonButton>
              <CommonButton color="error" size="small" onClick={() => onDelete(note._id)}>
                Delete
              </CommonButton>
            </>
          }
          index={idx}
        />
      ))}
    </div>
  );
};

export default Notes;
