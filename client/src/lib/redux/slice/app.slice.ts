import { MenuType } from "@/lib/enums";
import { AppState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const initialState : AppState = {
    editable: false,
    darkMode: false,
    loading: false,
    status: "idle",
    error: null,
    activeMenu: MenuType.NOTES
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setEditable: (state, action : PayloadAction<boolean>) => {
            state.editable = action.payload
        },
        setActiveMenu: (state, action: PayloadAction<MenuType>) => {
            state.activeMenu = action.payload
        },
    }
})

export const { setEditable, setActiveMenu } = appSlice.actions
export default appSlice.reducer