import { TagItem, TagState } from "@/lib/types";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

export const tagsAdapter = createEntityAdapter<TagItem>({
    sortComparer : (a, b) => b.createdAt.localeCompare(a.createdAt)
})

export const initialState : TagState = tagsAdapter.getInitialState({
    activeTagId: "",
    selectedTagId: [],
    loading: false,
    status: "idle",
    error: null
})

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {}
})

export const {  } = tagsSlice.actions
export default tagsSlice.reducer