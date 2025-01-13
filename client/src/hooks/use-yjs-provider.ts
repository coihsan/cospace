import { useEffect, useMemo } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

export function useYjsProviders(noteId: string) {
  const ydoc = useMemo(() => new Y.Doc(), []);
  const provider = useMemo(
    () => new WebsocketProvider('ws://localhost:5173', noteId, ydoc),
    [noteId, ydoc]
  );
  const webrtcProvider = useMemo(
    () => new WebrtcProvider(noteId, ydoc),
    [noteId, ydoc]
  );
  const indexeddbProvider = useMemo(
    () => new IndexeddbPersistence(noteId, ydoc),
    [noteId, ydoc]
  );

  useEffect(() => {
    return () => {
      provider.destroy();
      webrtcProvider.destroy();
      ydoc.destroy();
    };
  }, [provider, webrtcProvider, ydoc]);

  return { ydoc, provider, webrtcProvider, indexeddbProvider };
}