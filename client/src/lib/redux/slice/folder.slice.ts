import { FolderItem, FolderState, RootState } from "@/lib/types";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

export const folderAdapter = createEntityAdapter<FolderItem>({
    sortComparer: (a, b) => {
        const createdAtA = a.createdAt || '';
        const createdAtB = b.createdAt || '';
        return createdAtB.localeCompare(createdAtA);
    },
});

export const initialState : FolderState = folderAdapter.getInitialState({
    activeFolderId: "",
    loading: false,
    status: "idle",
    error: null,
    ids: [],
})

const folderSlice = createSlice({
    name: "folder",
    initialState,
    reducers: {}
})

export const {  } = folderSlice.actions
export default folderSlice.reducer

export const {
    selectAll: selectAllFolder,
    selectById: selectFolderById,
    selectIds: selectFolderId
} = folderAdapter.getSelectors((state: RootState) => state.folderState)