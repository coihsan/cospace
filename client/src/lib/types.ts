import { Content } from "@tiptap/react";

type Role = "owner" | "canEdit" | "viewOnly";

export interface User {
    id: string;
    fullName: string;
    username: string;
    isOnline?: boolean;
    role?: Role
}

export interface UsersState {
    users: User[]
    onlineUsersByUsername: string[]
    loading: boolean
    error: string | null,
    typingUsers: string[]
}

export interface collaborationSessions {
    sessionId: string,
    noteId: string,
    userId: string,
    role?: Role,
    lastSyncedAt: Date
}

export interface NoteItem {
    id: string,
    title: string,
    content: Content,
    lastModified: Date;
    tagsId?: string,
    trash: boolean,
    favorite: boolean,
    folderId?: string,
    collaborators: string[];
    version?: string[]
}

export interface FolderItem {
    id: string,
    name: string,
    createdAt: Date,
    lastUpdated: Date,
}

export interface FolderNotes {
    folderId: string,
    noteId: string
}
export interface FolderTags {
    noteId: string,
    tagId: string
}

export interface TagItem {
    id: string,
    name: string,
    color: string,
}

type Status = "idle" | "pending" | "success" | "rejected";

export interface NoteState {
    note: NoteItem[];
    activeNoteId: string;
    activeFolderId: string;
    selectedNoteId: string[];
    loading: boolean;
    status: Status;
    error: null;
}

export interface FolderState {
    folder: FolderItem[];
    activeFolderId: string;
    selectedFolderId: string[];
    loading: boolean;
    status: Status;
    error: null;
}

export interface AppState {
    editable: boolean;
    darkMode: boolean;
    loading: boolean;
    status: Status;
    error: null;
}

export interface TagState {
    tag: TagItem[];
    activeTagId: string;
    selectedTagId: string[];
    loading: boolean;
    status: Status;
    error: null;
}

export interface RootState {
    noteState: NoteState;
    folderState: FolderState;
    appState: AppState;
    tagState: TagState;
    authState: AuthState
}

export interface AuthState {
    currentUser: User | null
    isAuthenticated: boolean
    error: string | null
}