import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productCategoryServices from "./productCategoryServices";

export const getAllProductCategory = createAsyncThunk(
  "productCategory",
  async (thunkAPI) => {
    try {
      return await productCategoryServices.getAllProductCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const initialState = {
  productCategories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const productCategorySlice = createSlice({
  name: "categoryProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategories = action.payload;
      })
      .addCase(getAllProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default productCategorySlice.reducer;
