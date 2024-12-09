import { FolderState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit"

export const initialState : FolderState = {
    folder: [],
    activeFolderId: "",
    loading: false,
    status: "idle",
    error: null
}

const folderSlice = createSlice({
    name: "folder",
    initialState,
    reducers: {}
})

export const {  } = folderSlice.actions
export default folderSlice.reducer