import { createSlice } from "@reduxjs/toolkit";

export const authUser = createSlice({
  name: "authUser",
  initialState:{
  user: {},
  isAuthenticated: false,
  sessionId: "",
},
  reducers: {
    setUser: (oldState, action) => {
      oldState.user = action.payload;
      oldState.isAuthenticated = true;
      oldState.sessionId = localStorage.getItem("session_id");

      localStorage.setItem("account_id", action.payload.id);
    },
  },
});

export const { setUser } = authUser.actions;

export default authUser.reducer;

export const userSelector = (state) => state.currentUser;
