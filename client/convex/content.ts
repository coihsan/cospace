import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("ownerId"), identity.email))
      .collect();
  },
});

export const getNotes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notes").collect();
  },
});