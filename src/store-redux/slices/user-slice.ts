import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@src/store-redux/store';
import { UserPayload } from '@src/types/UserPayloadType';

// Define a interface for the slice state
interface userStateInterface {
  auth: UserPayload | null;
  isLoggedIn: boolean;
}

// Define the initial state using that interface
const initialState: userStateInterface = {
  auth: null,
  isLoggedIn: false
};

// Define the user slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserPayload | null>) => {},
    logout: (state) => {},
    autoLogin: (state) => {}
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
