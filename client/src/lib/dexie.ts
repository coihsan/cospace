import Dexie, { Table } from 'dexie';
import { FolderItem, NoteItem, TagItem } from './types';

export class Cospace extends Dexie {
  notes!: Table<NoteItem, string>;
  tags!: Table<TagItem, string>;
  folders!: Table<FolderItem, string>; 

  constructor() {
    super('cospace');
    this.version(1).stores({
      notes: '++id, content, title, favorite, lastUpdated, trash, folderId, user, roomId, ownerId, organizationId',
      folders: '++id, name, icon, lastUpdated',
      tags: '++id, name, color, lastUpdated',
      pendingChanges: '++id, noteId, changes, timestamp'
    });
  };
}

export const dexie = new Cospace();