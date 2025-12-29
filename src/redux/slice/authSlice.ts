import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutAction: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;