import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNote,
  readNote,
  readNotes,
  updateNote,
  deleteNote,
} from "@/utils/requests";
import { Note, Notes, StateStatus, NoteWithoutId } from "@/types";
interface NotesState {
  items: Notes;
  currentNote: Note | null;
  status: StateStatus;
  error: string | null;
}

const initialState: NotesState = {
  items: [],
  currentNote: null,
  status: "idle",
  error: null,
};

export const addNoteAsync = createAsyncThunk(
  "notes/addNote",
  async (note: NoteWithoutId) => {
    const newNote = await createNote(note as Note);
    return newNote as unknown as Note;
  }
);

export const fetchNoteAsync = createAsyncThunk(
  "notes/fetchNote",
  async (id: string) => {
    const note = await readNote(id);
    return note as Note;
  }
);

export const fetchNotesAsync = createAsyncThunk(
  "notes/fetchNotes",
  async () => {
    const notes = await readNotes();
    return notes as Notes;
  }
);

export const editNoteAsync = createAsyncThunk(
  "notes/editNote",
  async (note: Note) => {
    const updatedNote = await updateNote(note);
    return updatedNote;
  }
);

export const removeNoteAsync = createAsyncThunk(
  "notes/deleteNote",
  async (id: string) => {
    const deletedNote = await deleteNote(id);
    return {
      ...deletedNote,
      id,
    };
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setCurrentNote(state, action) {
      state.currentNote = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // addNote
      .addCase(addNoteAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addNoteAsync.rejected, (state) => {
        state.status = "failed";
        state.error = "Note ekleme başarısız";
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
        state.currentNote = action.payload;
      })
      // fetch note
      .addCase(fetchNoteAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNoteAsync.rejected, (state) => {
        state.status = "failed";
        state.error = "Note listeleme başarısız";
      })
      .addCase(fetchNoteAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentNote = action.payload;
      })
      // fetch notes
      .addCase(fetchNotesAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNotesAsync.rejected, (state) => {
        state.status = "failed";
        state.error = "Note listeleme başarısız";
      })
      .addCase(fetchNotesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      //updated note
      .addCase(editNoteAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editNoteAsync.rejected, (state) => {
        state.status = "failed";
        state.error = "Note güncelleme başarısız";
      })
      .addCase(editNoteAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentNote = action.payload;
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      // remove note
      .addCase(removeNoteAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeNoteAsync.rejected, (state) => {
        state.status = "failed";
        state.error = "Not silme başarısız";
      })
      .addCase(removeNoteAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentNote = null;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});

export const { setCurrentNote } = notesSlice.actions;
export default notesSlice.reducer;
