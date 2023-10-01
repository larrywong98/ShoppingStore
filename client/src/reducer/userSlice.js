import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    signedIn: false,
    userId: "",
    userName: "",
    admin: false,
  },
  reducers: {
    signIn: (state, actions) => {
      state.userId = actions.payload.userId;
      state.userName = actions.payload.userName;
      state.admin = actions.payload.admin;
      state.signedIn = true;
      return state;
    },
    signOut: (state) => {
      state = {
        signedIn: false,
        userId: "",
        userName: "",
        admin: false,
      };
      return state;
    },
    signInStatus: (state, actions) => {
      state.signedIn = actions.payload.status;
      return state;
    },
  },
});

export const { signIn, signOut, signInStatus } = userSlice.actions;

export default userSlice.reducer;
