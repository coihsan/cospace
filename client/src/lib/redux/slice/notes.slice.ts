import { daxie } from "@/lib/daxie";
import { NoteItem, NoteState, RootState } from "@/lib/types";
import { createSlice, createAsyncThunk, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit"

export const notesAdapter = createEntityAdapter<NoteItem>({
    sortComparer: (a, b) => b.lastModified.localeCompare(a.lastModified),
  });

export const fetchPublicNotes = createAsyncThunk('publicNotes/fetch', async () => {
    return await daxie.notes.toArray();
});

export const addPublicNote = createAsyncThunk('publicNotes/add', async (note: NoteItem) => {
    const id = await daxie.notes.add(note);
    return { ...note, id };
});

export const getActivePublicNote = createAsyncThunk(
    'publicNotes/get',
    async (noteId: string) => {
        const note = await daxie.notes.get(noteId);
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPublicNotes.fulfilled, (state, action) => {
                notesAdapter.setAll(state, action.payload);
            })
            .addCase(addPublicNote.fulfilled, (state, action) => {
                notesAdapter.addOne(state, action.payload)
            });
    },
})

export const { 
    setEditableNotes,
    setActiveNoteId,
    setActiveFolderId,
    setSelectedNotesIds,
    setSearchValue
 } = noteSlice.actions;
export default noteSlice.reducer;

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds,
} = notesAdapter.getSelectors((state: RootState) => state.noteState)