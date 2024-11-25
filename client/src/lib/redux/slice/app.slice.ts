import { AppState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit"

export const initialState : AppState = {
    editable: false,
    darkMode: false,
    loading: false,
    status: "idle",
    error: null
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setEditable : (state, action) => {
            state.editable = action.payload
        }
    }
})

export const { setEditable } = appSlice.actions
export default appSlice.reducer