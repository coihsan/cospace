import { useState } from "react";
import { useConnectionStatus } from "./use-connection-status";
import useOnlineStatus from "./use-online-status";
import { dexie } from "@/lib/dexie";
import { NoteItem, FolderItem } from "@/lib/types";
import { useOnlineSync } from "./use-online-sync";
import { v4 } from "uuid"
import { useAppDispatch } from "@/lib/redux/store";
import { addNote } from "@/lib/redux/slice/notes.slice";

type useOfflineSyncProps = {
  noteId: string
}

type NotesChanges = Pick<NoteItem, "id" | "content" | "title">

export const useOfflineSync = ({ noteId }: useOfflineSyncProps) => {
  const isOnline = useOnlineStatus();
  const { syncToServer } = useOnlineSync()
  const dispatch = useAppDispatch();

  const createInitialNote = (): NoteItem => {
    return {
      id: v4(),
      content: '',
      title: '',
      lastModified: '',
      trash: false,
      favorite: false,
      user: [],
      ownerId: '',
      syncStatus: 'pending',
      collaborators: []
    };
  };

  const createNewNote = () => {
    const newNote = createInitialNote();
    dispatch(addNote(newNote))
  }

  const saveNoteToLocaly = async (notes: NotesChanges): Promise<void> => {
    try {
      await dexie.notes.put({
        id: notes.id,
        content: notes.content,
        title: notes.title,
        lastModified: "",
        trash: false,
        favorite: false,
        user: [],
        ownerId: "",
        syncStatus: 'pending',
        collaborators: []
      })
    } catch (error) {
      console.error('Error saving locally:', error);
    }
  }

  const handleNoteChange = async (changes: NotesChanges): Promise<void> => {
    await saveNoteToLocaly(changes);
    if (isOnline) {
      syncToServer();
    }
  };
  
  return {
    handleNoteChange,
    createNewNote
  }
}