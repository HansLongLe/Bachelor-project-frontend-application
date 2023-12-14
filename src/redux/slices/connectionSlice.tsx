import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connection: undefined
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setConnection: (state, action) => {
      state.connection = action.payload;
    }
  }
});

export const { setConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
