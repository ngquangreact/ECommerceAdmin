import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadServices from "./uploadServices";

export const uploadImages = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadServices.uploadImgs(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      return await uploadServices.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetImageState = createAction("reset_all");
export const initialState = {
  images: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const uploadSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [action.payload[0], ...state.images];
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = state.images.filter(
          (img) => img.public_id !== action.meta.arg
        );
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetImageState, () => initialState);
  },
});

export default uploadSlice.reducer;
