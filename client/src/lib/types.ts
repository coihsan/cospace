import { Content } from "@tiptap/react";
import { MenuType } from "./enums";
import { EntityState } from "@reduxjs/toolkit";

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

export interface NoteItem {
    id: string;
    title: string;
    content: Content;
    lastModified: string;
    tagsId?: string;
    trash: boolean;
    favorite: boolean;
    folderId?: string;
    version?: string[];
    user: User[];
    syncedAt?: Date;
    roomId?: string;
    ownerId: string;
    organizationId?: string;
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

export interface RootState {
    noteState: NoteState;
    folderState: FolderState;
    appState: AppState;
    tagState: TagState;
    authState: AuthState
}