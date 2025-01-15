import { dexie } from "@/lib/db/dexie";
import { NoteItem, NoteState, RootState } from "@/lib/types";
import { createSlice, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../thunk";

export const notesAdapter = createEntityAdapter<NoteItem>({
    sortComparer: (a, b) => b.lastModified.localeCompare(a.lastModified),
  });

export const fetchAllNotes = createAppAsyncThunk('publicNotes/fetch', async () => {
    return await dexie.notes.toArray();
});

export const createNewNote = createAppAsyncThunk('publicNotes/add', async (note: NoteItem) => {
    const noteWithPendingStatus = {...note, syncStatus: 'pending' as const};
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

export const initialState: NoteState = notesAdapter.getInitialState({
    editable: false,
    activeNoteId: "",
    activeFolderId: "",
    selectedNotesIds: [],
    loading: false,
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
            if(notes){
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
        addNote: (state, action: PayloadAction<NoteItem>) => {
            state.activeNoteId = action.payload.id;
            notesAdapter.addOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllNotes.fulfilled, (state, action) => {
                notesAdapter.setAll(state, action.payload);
            })
            .addCase(createNewNote.fulfilled, (state, action) => {
                notesAdapter.addOne(state, action.payload);
            })
            .addCase(getActiveNoteId.fulfilled, ( state, action ) => {
                state.activeNoteId = action.payload as string;
            })
    },
})

export const { 
    setEditableNotes,
    setActiveNoteId,
    setActiveFolderId,
    setSelectedNotesIds,
    setSearchValue,
    addNote
 } = noteSlice.actions;
export default noteSlice.reducer;

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds,
} = notesAdapter.getSelectors((state: RootState) => state.noteState)