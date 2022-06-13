import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user'
export interface UserState {
  isAuth: boolean;
  isAdmin: boolean;
  user: User | null
} 

const initialState: UserState = {
  isAuth: false,
  isAdmin: false,
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    quit: (state) => {
        state.isAdmin = initialState.isAdmin
        state.isAuth = initialState.isAuth
        state.user = initialState.user
    },
    auth: (state, { payload }: PayloadAction<User>) => {
        state.isAuth = true
        state.user = payload
        state.isAdmin = payload.roleId === 1

    },
  },
});

// Action creators are generated for each case reducer function
export const { quit, auth } = userSlice.actions;

export default userSlice.reducer;
