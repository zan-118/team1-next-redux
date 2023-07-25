import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    id: "",
    Username: "",
    City: "",
    Email: "",
    Biodata: "",
  },
  isEdit: false,
  isLoading: false,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setEdit, setLoading } = user.actions;
export default user.reducer;
