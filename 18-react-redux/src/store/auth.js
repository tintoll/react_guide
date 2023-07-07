import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthuticated: false },
  reducers: {
    login(state) {
      state.isAuthuticated = true;
    },
    logout(state) {
      state.isAuthuticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
