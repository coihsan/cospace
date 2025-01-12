import { useState } from "react";
import { useConnectionStatus } from "./use-connection-status";
import useOnlineStatus from "./use-online-status";
import { daxie } from "@/lib/daxie";

type useOfflineSyncProps = {
    noteId: string
}
const useOfflineSync = ({ noteId }: useOfflineSyncProps) => {
    const [localNote, setLocalNote] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const isOnline = useOnlineStatus();

    // Fungsi untuk menyimpan perubahan ke IndexedDB
  const saveLocally = async (changes) => {
    try {
      // Simpan perubahan ke tabel notes
      await daxie.notes.put({
        id: noteId,
        ...changes,
        lastModified: new Date().toISOString(),
        syncStatus: 'pending'
      });

      // Tambahkan ke antrian perubahan
      await daxie.pendingChanges.add({
        noteId,
        changes,
        timestamp: new Date().toISOString()
      });

      setLocalNote(await daxie.notes.get(noteId));
    } catch (error) {
      console.error('Error saving locally:', error);
    }
  };

  // Fungsi untuk sync ke server
  const syncToServer = async () => {
    if (!isOnline) return;

    setIsSyncing(true);
    try {
      // Ambil semua perubahan yang pending
      const pendingChanges = await daxie.pendingChanges
        .where('noteId')
        .equals(noteId)
        .toArray();

      if (pendingChanges.length > 0) {
        // Sync ke server
        await syncNotesToServer(noteId, pendingChanges);

        // Hapus perubahan yang sudah di-sync
        await daxie.pendingChanges
          .where('noteId')
          .equals(noteId)
          .delete();

        // Update status sync di notes
        await daxie.notes
          .where('id')
          .equals(noteId)
          .modify({ syncStatus: 'synced' });
      }
    } catch (error) {
      console.error('Error syncing to server:', error);
    } finally {
      setIsSyncing(false);
    }
}