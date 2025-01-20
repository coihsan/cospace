import Dexie, { Table } from 'dexie';
import { FolderItem, NoteItem, TagItem } from '../types';

export class Cospace extends Dexie {
  notes!: Table<NoteItem, string>;
  tags!: Table<TagItem, string>;
  folders!: Table<FolderItem, string>; 

  constructor() {
    super('cospace');
    this.version(1).stores({
      notes: '++id, title, content, isPublic, lastUpdated, tagsId, trash, favorite, folderId, version, user, syncedAt, roomId, ownerId, syncStatus, collaborators',
      folders: '++id, name, createdAt, lastUpdated, isSharing, ownerId, collaborators',
      tags: '++id, name, color, createdAt, lastUpdated',
      pendingChanges: '++id, noteId, changes, timestamp'
    });
  };
}

export const dexie = new Cospace();