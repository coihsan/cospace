import { SyncPayload, SyncState } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialState: SyncState = {
    pendingSync: false,
    error: '',
    lastSynced: '',
    syncing: false
}

const syncSlice = createSlice({
    initialState: initialState,
    name: 'sync',
    reducers: {
        setPendingSync: (state) => {
            state.pendingSync = true
        },
        sync: (state, { payload }: PayloadAction<SyncPayload>) => {
            state.syncing = true
        },
        syncError: (state, { payload }: PayloadAction<string>) => {
            state.syncing = false
            state.error = payload
        },
        syncSuccess: (state, { payload }: PayloadAction<string>) => {
            state.syncing = false
            state.lastSynced = payload
            state.pendingSync = false
        },
    }
})
export const { sync, setPendingSync } = syncSlice.actions