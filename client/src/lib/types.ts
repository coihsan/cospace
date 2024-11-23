import { Content } from "@tiptap/react";

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
}

export interface FolderItem {
    id: string,
    name: string,
    createdAt: string,
    lastUpdated: string,
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