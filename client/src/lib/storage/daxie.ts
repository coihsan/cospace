import Dexie, { Table } from 'dexie';
import { FolderItem, NoteItem, TagItem } from '../types';

export class Cospace extends Dexie {
  notes!: Table<NoteItem, string>;
  tags!: Table<TagItem, string>;
  folders!: Table<FolderItem, string>; 

  constructor() {
    super('nulihapp');
    this.version(1).stores({
      notes: '++id, content, title, favorite, lastUpdated, trash, folderId, user',
      folders: '++id, name, icon, lastUpdated',
      tags: '++id, name, color, lastUpdated',
    });
  };
}

export const daxie = new Cospace();