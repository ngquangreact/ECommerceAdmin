import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCategoryServices from "./blogCategoryServices";

export const getAllBlogCategory = createAsyncThunk(
  "blogCategory/get-all-blogcat",
  async (thunkAPI) => {
    try {
      return await blogCategoryServices.getAllBlogCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  "blogCategory/create-blog-category",
  async (blogCategoryData, thunkAPI) => {
    try {
      return await blogCategoryServices.createBlogCategory(blogCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const initialState = {
  blogCategories: [],
  createdBlogCategory: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const blogCategorySlice = createSlice({
  name: "blogCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload;
      })
      .addCase(getAllBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
