import { AuthState } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLogin: (state, { payload }: PayloadAction<any>) => {
      state.currentUser = payload
      state.isAuthenticated = true
    },
    userLogout: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    },
  },
})

export const { userLogin, userLogout } = usersSlice.actions
export default usersSlice.reducer