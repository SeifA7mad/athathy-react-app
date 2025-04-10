import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
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
    login: (state, action: PayloadAction<UserPayload | null>) => {
      state.auth = action.payload;
      state.isLoggedIn = true;

      // Save the user data to local storage
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));

      // window.location.href = `${APP_PREFIX_PATH}/${AUTHENTICATED_ENTRY}`;
    },
    logout: (state) => {
      state.auth = null;
      state.isLoggedIn = false;

      // Clear the user data from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      // window.location.href = `${APP_PREFIX_PATH}/`;
    },
    autoLogin: (state) => {
      const user = localStorage.getItem('user');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if (user && isLoggedIn) {
        state.auth = JSON.parse(user);
        state.isLoggedIn = JSON.parse(isLoggedIn);
      }
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
