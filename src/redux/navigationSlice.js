import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    currentScreen: 'Login',
  },
  reducers: {
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { setCurrentScreen } = navigationSlice.actions;
export default navigationSlice.reducer;