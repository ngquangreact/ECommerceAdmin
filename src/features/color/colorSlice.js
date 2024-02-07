import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorServices from "./colorServices";

export const getAllColor = createAsyncThunk(
  "color/get-all-color",
  async (thunkAPI) => {
    try {
      return await colorServices.getAllColor();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const initialState = {
  colors: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getAllColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = action.error;
      });
  },
});

export default colorSlice.reducer;
