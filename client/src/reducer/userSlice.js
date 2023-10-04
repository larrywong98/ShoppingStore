import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    signedIn: false,
    userId: "",
    userName: "",
    admin: false,
<<<<<<< HEAD
=======
    updatePwdName: "",
>>>>>>> bdf0ad10c5356daa06ba11c687831b4f678208e0
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
<<<<<<< HEAD
    signInStatus: (state, actions) => {
      state.signedIn = actions.payload.status;
=======
    setUpdatePwdName: (state, action) => {
      state.updatePwdName = action.payload.name;
>>>>>>> bdf0ad10c5356daa06ba11c687831b4f678208e0
      return state;
    },
  },
});

<<<<<<< HEAD
export const { signIn, signOut, signInStatus } = userSlice.actions;
=======
export const { signIn, signOut, setUpdatePwdName } = userSlice.actions;
>>>>>>> bdf0ad10c5356daa06ba11c687831b4f678208e0

export default userSlice.reducer;
