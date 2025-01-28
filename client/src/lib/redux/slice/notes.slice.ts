import { dexie } from "@/lib/db/dexie";
import { NoteItem, NoteState, RootState } from "@/lib/types";
import { createSlice, PayloadAction, createEntityAdapter, Update } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../thunk";
import { Content } from "@tiptap/react";
import { currentItem } from "@/lib/helpers";

export const notesAdapter = createEntityAdapter<NoteItem>({
  sortComparer: (a, b) => {
    if (typeof a.lastUpdated === 'string' && typeof b.lastUpdated === 'string') {
      return b.lastUpdated.localeCompare(a.lastUpdated);
    } else {
      return 0;
    }
  }
});

export const fetchAllNotes = createAppAsyncThunk<NoteItem[], void, { rejectValue: string }>(
  'notes/fetchAllNotes',
  async (_, { rejectWithValue }) => {
    try {
      const notes = await dexie.notes.toArray();
      return notes;
    } catch (error) {
      console.log('Failed to fetch all notes');
      return rejectWithValue('Failed to fetch notes');
    }
  }
);

export const createNewNote = createAppAsyncThunk('publicNotes/add', async (note: NoteItem) => {
  const noteWithPendingStatus = { ...note, syncStatus: 'pending' as const };
  const id = await dexie.notes.add(noteWithPendingStatus);
  return { ...noteWithPendingStatus, id };
});

export const getActiveNoteId = createAppAsyncThunk(
  'publicNotes/get',
  async (noteId: string) => {
    const note = await dexie.notes.get(noteId);
    if (note) {
      return note.content;
    } else {
      throw new Error('getActiveNote not found');
    }
  }
)

export const toggleNoteTrash = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; value: boolean }>(
  'notes/deleteNotes',
  async (data, { rejectWithValue }) => {
    try {
      const updates: Partial<NoteItem> = { trash: data.value };
      if (data.value) {
        updates.favorite = false;
      }
      await dexie.notes.update(data.noteId, updates);
      return { id: data.noteId, changes: updates };
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const toggleNoteFavorite = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; value: boolean }>(
  'notes/markAsFavorite',
  async (data, { rejectWithValue }) => {
    try {
      const updates: Partial<NoteItem> = { favorite: data.value };
      if (data.value) {
        updates.favorite = true
      }
      await dexie.notes.update(data.noteId, updates);
      return { id: data.noteId, changes: updates }
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
)

export const updateTitleNotes = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; title: string }>(
  'notes/updateTitle',
  async (data, { rejectWithValue }) => {
    try {
      const existingNote = await dexie.notes.get(data.noteId);
      if (existingNote) {
        const updates: Partial<NoteItem> = {
          content: data.title,
          lastUpdated: currentItem,
        };
        await dexie.notes.update(data.noteId, updates);
        return { id: data.noteId, changes: updates };
      } else {
        return rejectWithValue('update title Note not found');
      }
    } catch (error) {
      console.error('Failed to update note title', error);
      return rejectWithValue(error as string);
    }
  }
)

export const updateSelectedNotes = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; content: Content }>(
  'notes/updateContent',
  async (data, { rejectWithValue }) => {
    try {
      const existingNote = await dexie.notes.get(data.noteId);
      if (existingNote) {
        const updates: Partial<NoteItem> = {
          content: data.content,
          lastUpdated: currentItem,
        };
        await dexie.notes.update(data.noteId, updates);
        return { id: data.noteId, changes: updates };
      } else {
        return rejectWithValue('updateContentThunk Note not found');
      }
    } catch (error) {
      console.error('Failed to update note content', error);
      return rejectWithValue(error as string);
    }
  }
);

export const EmptyTrashNote = createAppAsyncThunk<string[], void, { rejectValue: string }>(
  'note/deleteEmpty',
  async (_, { rejectWithValue }) => {
    try {
      const allNotes = await dexie.notes.toArray();
      const notesToDelete = allNotes.filter(note => note.trash);
      const noteIdsToDelete = notesToDelete.map(note => note.id);
      await dexie.notes.bulkDelete(noteIdsToDelete);
      return noteIdsToDelete;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const deleteNotePermanently = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string }, { rejectValue: string }>(
  'notes/deletePermanently',
  async (data, { rejectWithValue }) => {
    try {
      const notes = await dexie.notes.toArray();
      const notesToDelete = notes.find(note => note.id === data.noteId);

      if (notesToDelete) {
        const ids = notesToDelete.id;
        await dexie.notes.delete(ids);
        return { id: ids, changes: {} };
      } else {
        return rejectWithValue('deletePermanentAction Note not found');
      }
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
)

export const initialState: NoteState = notesAdapter.getInitialState({
  editable: false,
  activeNoteId: "",
  activeFolderId: "",
  selectedNotesIds: [],
  loading: true,
  status: "idle",
  error: null,
  searchValue: "",
})

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setEditableNotes: (state, action: PayloadAction<boolean>) => {
      const notes = state.selectedNotesIds.filter((note) => note);
      if (notes) {
        state.editable = action.payload
      } else {
        action.payload === false
      }
    },
    setActiveNoteId: (state, action: PayloadAction<string>) => {
      state.activeNoteId = action.payload;
    },
    setActiveFolderId: (state, action: PayloadAction<string>) => {
      state.activeFolderId = action.payload;
    },
    setSelectedNotesIds: (state, action: PayloadAction<string[]>) => {
      state.selectedNotesIds = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        if (action.payload) {
          notesAdapter.setAll(state, action.payload)
        } else {
          notesAdapter.setAll(state, [])
          state.error = 'Failed to fetch notes';
        }
        state.loading = true
      })
      .addCase(createNewNote.fulfilled, (state, action) => {
        notesAdapter.addOne(state, action.payload);
      })
      .addCase(getActiveNoteId.fulfilled, (state, action) => {
        state.activeNoteId = action.payload as string;
      })
      .addCase(toggleNoteTrash.fulfilled, (state, action) => {
        state.status = 'success',
          notesAdapter.updateOne(state, action.payload)
      })
      .addCase(toggleNoteFavorite.fulfilled, (state, action) => {
        state.status = "success",
          notesAdapter.updateOne(state, action.payload)
      })
      .addCase(updateTitleNotes.fulfilled, (state, action) => {
        notesAdapter.updateOne(state, action.payload),
          state.status = 'success'
      })
      .addCase(updateSelectedNotes.fulfilled, (state, action) => {
        notesAdapter.updateOne(state, action.payload),
          state.status = 'success'
      })
      .addCase(EmptyTrashNote.fulfilled, (state, action) => {
        notesAdapter.removeMany(state, action.payload),
          state.status = 'success'
      })
      .addCase(deleteNotePermanently.fulfilled, (state, action) => {
        notesAdapter.removeOne(state, action.payload.id),
        state.status = "success",
        state.loading = true
      })
  },
})

export const {
  setEditableNotes,
  setActiveNoteId,
  setActiveFolderId,
  setSelectedNotesIds,
  setSearchValue,
} = noteSlice.actions;
export default noteSlice.reducer;

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors((state: RootState) => state.noteState)