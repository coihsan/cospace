import { FolderItem, FolderState, NoteItem, RootState } from "@/lib/types";
import { createSlice, createEntityAdapter, Update } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../thunk";
import { dexie } from "@/lib/db/dexie";

export const folderAdapter = createEntityAdapter<FolderItem>({
    sortComparer: (a, b) => {
        const createdAtA = a.createdAt || '';
        const createdAtB = b.createdAt || '';
        return createdAtB.localeCompare(createdAtA);
    },
});

export const initialState: FolderState = folderAdapter.getInitialState({
    activeFolderId: "",
    loading: false,
    status: "idle",
    error: null,
    ids: [],
})

export const fetchAllFolder = createAppAsyncThunk<FolderItem[]>(
    'folder/fetchAllFolder',
    async (_, { rejectWithValue }) => {
        try {
            const folders = await dexie.folders.toArray()
            return folders
        } catch (error) {
            return rejectWithValue("Error to fetch folders")
        }
    }
)

export const createNewFolder = createAppAsyncThunk(
    'folder/addFolder',
    async (folder: FolderItem, { rejectWithValue }) => {
        try {
            const data = await dexie.folders.add({ ...folder })
            return { ...folder, data }
        } catch (error) {
            console.log('Failed to create new folder')
            return rejectWithValue(error);
        }
    }
)

export const renameFolder = createAppAsyncThunk<Update<FolderItem, string>, { folderId: string; folderName: string }>(
    'folder/renameFolder',
    async (data, { rejectWithValue }) => {
        try {
            const rename: Pick<FolderItem, "name"> = { name: data.folderName }

            if (data.folderId) {
                rename.name = data.folderName
            }
            await dexie.folders.update(data.folderId, { name: data.folderName })
            return {
                id: data.folderId,
                changes: { name: data.folderName }
            }
        } catch (error) {
            return rejectWithValue("Error to update folder name")
        }
    }
)

export const removeFolder = createAppAsyncThunk<Update<FolderItem, string>, { folderId: string }, { rejectValue: string }>(
    'folder/deleteFolder',
    async (data, { rejectWithValue }) => {
        try {
            const folderToDelete = await dexie.folders.get(data.folderId);

            if (folderToDelete) {
                const notesInFolder = await dexie.notes.where('folderId').equals(data.folderId).toArray();
                for (const note of notesInFolder) {
                    await dexie.notes.delete(note.id);
                }
                await dexie.folders.delete(folderToDelete.id);
                return { id: folderToDelete.id, changes: {} };
            } else {
                return rejectWithValue('Folder not found');
            }
        } catch (error) {
            return rejectWithValue('Error deleting folder: ' + error);
        }
    }
);

export const moveNoteToFolder = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; folderId: string }>(
    'note/moveNoteToFolder',
    async (data, { rejectWithValue }) => {
        try {
            await dexie.notes.update(data.noteId, { folderId: data.folderId });
            return { id: data.noteId, changes: { folderId: data.folderId } };
        } catch (error) {
            return rejectWithValue('Error moving note to folder:' + error)
        }
    }
)

const folderSlice = createSlice({
    name: "folder",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createNewFolder.fulfilled, (state, action) => {
                folderAdapter.addOne(state, action.payload);
                state.loading = true;
                state.status = 'success';
            })
            .addCase(renameFolder.fulfilled, (state, action) => {
                folderAdapter.updateOne(state, action.payload);
                state.loading = false;
                state.status = 'success';
            })
            .addCase(fetchAllFolder.fulfilled, (state, action) => {
                folderAdapter.setAll(state, action.payload);
                state.loading = false;
                state.status = 'success';
            })
            .addCase(removeFolder.fulfilled, (state, action) => {
                folderAdapter.removeOne(state, action.payload.id);
                state.loading = false;
                state.status = 'success';
            })
            .addCase(moveNoteToFolder.fulfilled, (state, action) => {
                folderAdapter.updateOne(state, action.payload);
                state.loading = false;
                state.status = 'success';
            })
    },
})

export const { } = folderSlice.actions
export default folderSlice.reducer

export const {
    selectAll: selectAllFolder,
    selectById: selectFolderById,
    selectIds: selectFolderId
} = folderAdapter.getSelectors((state: RootState) => state.folderState)