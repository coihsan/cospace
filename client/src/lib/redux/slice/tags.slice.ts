import { TagState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit"

export const initialState : TagState = {
    tag: [],
    activeTagId: "",
    selectedTagId: [],
    loading: false,
    status: "idle",
    error: null
}

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {}
})

export const {  } = tagsSlice.actions
export default tagsSlice.reducer