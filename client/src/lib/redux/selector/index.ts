import { RootState } from "@/lib/types"
import { selectAllNotes } from "../slice/notes.slice"
import { createSelector } from "@reduxjs/toolkit"

export const getNotes = (state: RootState) => state.noteState
export const getFolder = (state: RootState) => state.folderState
export const getApp = (state: RootState) => state.appState
export const getAuth = (state: RootState) => state.authState

export const selectFilteredNotes = createSelector(
    (state: RootState) => selectAllNotes(state), 
    (state: RootState) => state.noteState.activeFolderId, 
    (state: RootState) => state.noteState.searchValue,
    (notes, activeFolderId, searchQuery) => {
      return notes.filter(note => {
        const isInFolder = activeFolderId ? note.folderId === activeFolderId : true;
        const matchesQuery = searchQuery ? note.content?.toString().toLowerCase().includes(searchQuery.toLowerCase()) : true;
        return isInFolder && matchesQuery;
      });
    }
  );