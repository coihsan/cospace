import { LiveList, createClient } from "@liveblocks/client"
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      cursor: { x: number; y: number };
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      // Example, a conflict-free list
      animals: LiveList<string>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        // Example properties, for useSelf, useUser, useOthers, etc.
        name: string;
        avatar: string;
        color: string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {};
      // Example has two events, using a union
      // | { type: "PLAY" } 
      // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      x: number;
      y: number;
    };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      title: string;
      url: string;
    };
  }
}

const client = createClient({
  authEndpoint: async (room) => {
    const headers = {
      // Custom headers
      // ...

      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      // Custom body
      // ...

      room,
    });

    const response = await fetch("/api/liveblocks-auth", {
      method: "POST",
      headers,
      body,
    });

    return await response.json();
  },
});

export {client};
