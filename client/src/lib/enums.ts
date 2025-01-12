export enum NotesSortKey {
    LAST_UPDATED = 'lastUpdated',
    TITLE = 'title',
    CREATED_DATE = 'created_date',
  }

  export enum NoteStatus {
    Active,
    Trashed,
    Archived,
}

export enum MenuType {
  NOTES = 'Notes',
  TAGS = 'Tags',
  FAVORITE = 'Favorites',
  TRASH = 'Trash',
  SETTINGS = 'Settings',
  ACCOUNT = 'Account',
  FOLDER = 'Folder',
  NOTIFICATION = 'Notification'
}