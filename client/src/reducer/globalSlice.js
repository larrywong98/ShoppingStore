import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    loading: true,
  },
  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload.to;
      return state;
    },
  },
});

export const { toggleLoading } = globalSlice.actions;

export default globalSlice.reducer;
