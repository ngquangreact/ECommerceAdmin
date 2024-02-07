import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const initialState = {
  blogCategories: [],
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
      });
  },
});

export default blogCategorySlice.reducer;
