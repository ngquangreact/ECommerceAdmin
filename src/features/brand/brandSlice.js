import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandServices from "./brandServices";

export const getAllBrand = createAsyncThunk(
  "brand/get-all-brand",
  async (thunkAPI) => {
    try {
      return await brandServices.getAllBrand();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const initialState = {
  brands: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = action.error;
      });
  },
});

export default brandSlice.reducer;
