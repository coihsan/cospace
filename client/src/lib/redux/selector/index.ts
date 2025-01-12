import { RootState } from "@/lib/types"

export const getNotes = (state: RootState) => state.noteState
export const getFolder = (state: RootState) => state.folderState
export const getApp = (state: RootState) => state.appState
export const getAuth = (state: RootState) => state.authState