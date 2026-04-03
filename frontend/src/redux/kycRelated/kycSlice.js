import { createSlice } from '@reduxjs/toolkit';
import { createKYCRequest, getAllKYCRequests, updateKYCStatus } from './kycHandel';

const kycSlice = createSlice({
  name: 'kyc',
  initialState: {
    kycs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createKYCRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createKYCRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.kycs.push(action.payload);
      })
      .addCase(getAllKYCRequests.fulfilled, (state, action) => {
        state.kycs = action.payload;
        state.loading = false;
      })
      .addCase(updateKYCStatus.fulfilled, (state, action) => {
        const index = state.kycs.findIndex((k) => k._id === action.payload._id);
        if (index !== -1) {
          state.kycs[index] = action.payload;
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default kycSlice.reducer;
