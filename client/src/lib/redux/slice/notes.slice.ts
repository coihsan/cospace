import { daxie } from "@/lib/storage/daxie";
import { NoteItem, NoteState } from "@/lib/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

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

export const initialState: NoteState = {
    note: [],
    activeNoteId: "",
    activeFolderId: "",
    selectedNoteId: [],
    loading: false,
    status: "idle",
    error: null,
}

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPublicNotes.fulfilled, (state, action) => {
                state.note = action.payload;
            })
            .addCase(addPublicNote.fulfilled, (state, action) => {
                state.note.push(action.payload);
            });
    },
})

export const { } = noteSlice.actions;
export default noteSlice.reducer;