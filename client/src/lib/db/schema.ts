import z from "zod"
import { v4 } from "uuid"

export const NoteItemSchema = z.object({
    id: z.string().default(v4),
    title: z.string().max(30),
    content: z.string().optional(),
    isPublic: z.boolean().default(false),
    lastUpdated: z.date(),
    tagsId: z.string().default(""),
    trash: z.boolean().default(false),
    favorite: z.boolean().default(false),
    folderId: z.string().default(""),
    version: z.array(z.string()).optional(),
    user: z.object({
        id: z.string(),
        fullName: z.string(),
        username: z.string(),
        isOnline: z.boolean().default(false),
        role: z.enum(["owner", "canEdit", "viewOnly"]).default('owner'),
        color: z.string().optional()
    }),
    syncedAt: z.date().optional(),
    roomId: z.string().default(""),
    ownerId: z.string().default(""),
    syncStatus: z.enum(['pending', 'synced', 'error']).default('pending'),
    collaborators: z.object({
        userId: z.string().optional(),
        permission: z.enum(["owner", "canEdit", "viewOnly"]).default('owner')
    })
})

export const FolderItemSchema = z.object({
    id: z.string().default(v4),
    name: z.string().max(30),
    createdAt: z.date(),
    lastUpdated: z.date(),
    isSharing: z.boolean().default(false),
    ownerId: z.string().default(""),
    collaborators: z.array(z.string()).optional()
})
