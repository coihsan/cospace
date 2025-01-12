import { useEffect, useMemo } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

export function useYjsProviders(documentId: string) {
  const ydoc = useMemo(() => new Y.Doc(), []);
  const provider = useMemo(
    () => new WebsocketProvider('ws://localhost:5173', documentId, ydoc),
    [documentId, ydoc]
  );
  const webrtcProvider = useMemo(
    () => new WebrtcProvider(documentId, ydoc),
    [documentId, ydoc]
  );
  const indexeddbProvider = useMemo(
    () => new IndexeddbPersistence(documentId, ydoc),
    [documentId, ydoc]
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