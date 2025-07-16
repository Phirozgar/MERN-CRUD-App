import {create} from "zustand";
import axios from "axios";

const notesStore = create((set, get) => ({
  notes: null,

  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  fetchNotes: async () => {
    try {
      // Retrieve notes from the server
      const res = await axios.get("/notes");
      
      // Store notes in state
      set({ notes: res.data.notes });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  },

  updateCreateFormField: (e) => {
    // Update create form input fields
    const { name, value } = e.target;

    set((state) => ({
      createForm: {
        ...state.createForm,
        [name]: value,
      },
    }));
  },

  createNote: async (e) => {
    e.preventDefault();

    try {
      // Retrieve form data from state
      const { createForm, notes } = get();
      
      // Send a request to create a new note
      const res = await axios.post("/notes", createForm);
      
      // Create a completely new array for React to detect the change
      const updatedNotes = notes ? [...notes, res.data.note] : [res.data.note];
      
      // Update state with new notes array and reset form
      set({
        notes: updatedNotes,
        createForm: {
          title: "",
          body: "",
        },
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  },

  deleteNote: async (_id) => {
    try {
      // Request to delete the selected note
      await axios.delete(`/notes/${_id}`);
      
      // Get current notes and filter out the deleted one
      const { notes } = get();
      const filteredNotes = notes.filter(note => note._id !== _id);
      
      // Update state with filtered notes
      set({ notes: filteredNotes });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  },

  handleUpdateFieldChange: (e) => {
    // Update update form input fields
    const { value, name } = e.target;

    set((state) => ({
      updateForm: {
        ...state.updateForm,
        [name]: value,
      },
    }));
  },

  toggleUpdate: ({ _id, title, body }) => {
    // Fill the update form with the selected note's details
    set({
      updateForm: {
        _id,
        title,
        body,
      },
    });
  },

  updateNote: async (e) => {
    e.preventDefault();

    try {
      // Get current state
      const { updateForm, notes } = get();
      const { _id, title, body } = updateForm;
      
      // Send a request to update the selected note
      const res = await axios.put(`/notes/${_id}`, {
        title,
        body,
      });
      
      // Get the updated note from response
      const updatedNote = res.data.note;
      
      // Create a completely new array of notes with the updated note
      const updatedNotes = notes.map(note => 
        note._id === _id ? updatedNote : note
      );
      
      // Force a complete state update with the new array
      set(state => ({
        notes: [...updatedNotes], // Create a completely new array reference
        updateForm: {
          _id: null,
          title: "",
          body: "",
        }
      }));
      
      // Force a refresh of the notes
      setTimeout(() => {
        get().fetchNotes();
      }, 50);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  },
}));

export default notesStore;

/**
 * The main differences that fixed the issue:

  1. State Access Method:
  Old: notesStore.getState()
  New: get() (using the function provided by Zustand)


  2. Array Modification Approach:
  Old: Create array copy, find index, then modify specific element at that index
  New: Use map() to create a completely new array with the updated element


  3. Additional Safeguards:
  Added error handling with try/catch
  Added forced refresh with setTimeout and fetchNotes
  Created an extra layer of new reference with [...updatedNotes]


  4. State Update Pattern:
  Old: Direct object assignment
  New: Functional update with latest state reference

  The key improvement was replacing the mutation-style approach (find and replace) 
  with a transformation approach (map), 
  which ensures React properly detects the change and re-renders the component.
 */