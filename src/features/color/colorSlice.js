import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const getColor = createAsyncThunk(
  "color/get-color",
  async (id, thunkAPI) => {
    try {
      return await colorServices.getColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "color/delete-color",
  async (id, thunkAPI) => {
    try {
      return await colorServices.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateColor = createAsyncThunk(
  "color/update-color",
  async (data, thunkAPI) => {
    try {
      return await colorServices.updateColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createColor = createAsyncThunk(
  "color/create-color",
  async (dataColor, thunkAPI) => {
    try {
      return await colorServices.createColor(dataColor);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");
export const initialState = {
  colors: [],
  createdColor: "",
  updatedColor: "",
  nameColor: "",
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
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = action.error;
      })
      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.nameColor = action.payload.title;
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = action.error;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
        state.nameColor = "";
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = action.error;
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
