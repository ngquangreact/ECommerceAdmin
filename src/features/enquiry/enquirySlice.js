import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryServices from "./enquiryServices";

export const getAllEnquiry = createAsyncThunk(
  "enquiry/all-enquiry",
  async (thunkAPI) => {
    try {
      return await enquiryServices.getAllEnquires();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryServices.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEnquiry = createAsyncThunk(
  "enquiry/get-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryServices.getEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async (enq, thunkAPI) => {
    try {
      return await enquiryServices.updateEnquiry(enq);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  enquiries: [],
  enquiry: "",
  updatedEnqiry: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getAllEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
      })
      .addCase(getEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnqiry = action.payload;
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default enquirySlice.reducer;
