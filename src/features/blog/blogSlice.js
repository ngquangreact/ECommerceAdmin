import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogServices from "./blogServices";

export const getAllblog = createAsyncThunk(
  "blog/get-all-blog",
  async (thunkAPI) => {
    try {
      return await blogServices.getAllBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/create-blog",
  async (blogData, thunkAPI) => {
    try {
      return await blogServices.createBlog(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");

export const initialState = {
  blogs: [],
  createdblog: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllblog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllblog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getAllblog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogs = action.error;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdblog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogs = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
