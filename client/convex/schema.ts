import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    id: v.string(),
    title: v.string(),
    content: v.string(),
    lastUpdated: v.string(),
    tagsId: v.string(),
    trash: v.boolean(),
    favorite: v.boolean(),
    folderId: v.string(),
    collaborators: v.array(v.string()),
    user: v.array(v.string()),
    version: v.array(v.string()),
  }),
  folder: defineTable({
    id: v.string(),
    name: v.string(),
    lastUpdated: v.string(),
  }),
  tags: defineTable({
    id: v.string(),
    name: v.string(),
    lastUpdated: v.string(),
    color: v.string()
  }),
  user: defineTable({
    id: v.string(),
    fullName: v.string(),
    email: v.string(),
    avatar: v.string(),
    role: v.string(),
    isOnline: v.boolean()
  })
})