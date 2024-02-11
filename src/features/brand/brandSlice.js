import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const createBrand = createAsyncThunk(
  "brand/create-brand",
  async (brandData, thunkAPI) => {
    try {
      return await brandServices.createBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");

export const initialState = {
  brands: [],
  createdBrand: "",
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
        state.message = action.error;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBrand = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
