import { z } from 'zod';

export const noteSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    lastModified: z.date(),
    tagsId: z.string().optional(),
    trash: z.boolean(),
    favorite: z.boolean(),
    folderId: z.string().optional(),
    collaborators: z.array(z.string()),
    version: z.array(z.string()).optional(),
    user: z.array(z.string()),
    syncedAt: z.date().optional(),
});

export const folderSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Note = z.infer<typeof noteSchema>;
export type Folder = z.infer<typeof folderSchema>;