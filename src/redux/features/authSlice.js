import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Username: "",
  id: "",
  loading: false,
  success: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action) => {
      return {
        Username: action.payload.Username,
        loading: true,
        success: true,
      };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload.id;
      state.Username = action.payload.username;
    },
  },
});

export const { login, logout, setLoading, setId } = auth.actions;
export default auth.reducer;
