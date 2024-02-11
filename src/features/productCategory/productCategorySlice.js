import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productCategoryServices from "./productCategoryServices";

export const getAllProductCategory = createAsyncThunk(
  "productCategory/get-all-product-category",
  async (thunkAPI) => {
    try {
      return await productCategoryServices.getAllProductCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  "productCategory/create-product-category",
  async (pCategoryData, thunkAPI) => {
    try {
      return await productCategoryServices.createProductCategory(pCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");

export const initialState = {
  productCategories: [],
  createdProductCategory: "",
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
      })
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProductCategory = action.payload;
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productCategorySlice.reducer;
