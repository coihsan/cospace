import { Content } from "@tiptap/react";
import { MenuType } from "./enums";
import { EntityState } from "@reduxjs/toolkit";
import { sync } from "@/lib/redux/slice/sync.slice"

type Role = "owner" | "canEdit" | "viewOnly";

type storageType = 'local' | 'cloud';

// ================ RELATIONS TYPE ================

export interface User {
    id: string;
    fullName: string;
    username: string;
    isOnline?: boolean;
    role?: Role;
    storageType: storageType;
    color?: string
}
export interface NotePermission {
    userId: string[];
    permission: 'canEdit' | 'viewOnly';
  }

export interface NoteItem {
    id: string;
    title: string;
    content: Content;
    isPublic?: boolean;
    lastModified: string;
    tagsId?: string;
    trash: boolean;
    favorite: boolean;
    folderId?: string;
    version?: string[];
    user: User | User[];
    syncedAt?: Date;
    roomId?: string;
    ownerId?: string;
    syncStatus?: 'pending' | 'synced' | 'error';
    collaborators?: NotePermission[];
}

export interface TagItem {
    id: string,
    name: string,
    color: string,
    createdAt: string,
    lastUpdated: string,
}

export interface FolderItem {
    id: string,
    name: string,
    createdAt: string,
    lastUpdated: string,
}

export interface collaborationSessions {
    sessionId: string,
    noteId: string,
    userId: string,
    role?: Role,
    lastSyncedAt: Date
}

export interface FolderNotes {
    folderId: string,
    noteId: string
}
export interface FolderTags {
    noteId: string,
    tagId: string
}

// ================ STATE TYPE ================

export interface UsersState {
    users: User[]
    onlineUsersByUsername: string[]
    loading: boolean
    error: string | null,
    typingUsers: string[]
}

type Status = "idle" | "pending" | "success" | "rejected";

export interface NoteState extends EntityState<NoteItem, string> {
    activeNoteId: string;
    selectedNotesIds: string[];
    activeFolderId: string;
    searchValue: string;
    editable: boolean,
    loading: boolean;
    status: Status;
    error: null;
}

export interface FolderState extends EntityState<FolderItem, string> {
    activeFolderId: string;
    loading: boolean;
    status: Status;
    error: null;
}

export interface AppState {
    editable: boolean;
    activeMenu: MenuType;
    darkMode: boolean;
    loading: boolean;
    status: Status;
    error: null;
}

export interface TagState extends EntityState<TagItem, string> {
    activeTagId: string;
    selectedTagId: string[];
    loading: boolean;
    status: Status;
    error: null;
}

export interface AuthState {
    currentUser: User | null
    isAuthenticated: boolean
    error: string | null
}

export interface SyncState {
    syncing: boolean
    lastSynced: string
    error: string
    pendingSync: boolean
}

export interface SyncPayload {
    folders: FolderItem[]
    notes: NoteItem[]
  }
  
  export interface SyncAction {
    type: typeof sync.type
    payload: SyncPayload
  }

export interface RootState {
    noteState: NoteState;
    folderState: FolderState;
    appState: AppState;
    tagState: TagState;
    authState: AuthState
}