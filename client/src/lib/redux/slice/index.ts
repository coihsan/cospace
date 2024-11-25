import { Reducer, combineReducers } from "redux"
import appReducer from "./app.slice"
import folderReducer from "./folder.slice"
import noteReducer from "./notes.slice"
import tagsReducer from "./tags.slice"
import authReducer from "./auth.slice"
import { RootState } from "@/lib/types"

const rootReducer : Reducer<RootState> = combineReducers({
    noteState: noteReducer,
    folderState: folderReducer,
    tagState: tagsReducer,
    appState: appReducer,
    authState: authReducer
})
export default rootReducer