import notesStore from "../stores/notesStore.js";

export default function Note({ note }) {
  const { deleteNote, toggleUpdate } = notesStore();

  return (
    <div key={note._id} style={{ border: "1px solid black", margin: "10px", display: "inline-block" }}>
      <h2>Note:</h2>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p>{note._id}</p>
      <hr />
      <button onClick={() => deleteNote(note._id)}>Delete note</button>
      <button onClick={() => toggleUpdate(note)}>Update note</button>
    </div>
  );
}