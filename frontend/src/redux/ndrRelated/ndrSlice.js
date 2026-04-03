// File: redux/ndrRelated/ndrSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
    createNDREntry,
    getAllNDREntries,
    updateNDRAction,
    deleteNDREntry
} from './ndrHandle';

const ndrSlice = createSlice({
    name: 'ndr',
    initialState: {
        ndrs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // 📦 Create
            .addCase(createNDREntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNDREntry.fulfilled, (state, action) => {
                state.loading = false;
                state.ndrs.unshift(action.payload);
            })
            .addCase(createNDREntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 📦 Fetch All
            .addCase(getAllNDREntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllNDREntries.fulfilled, (state, action) => {
                state.loading = false;
                state.ndrs = action.payload;
            })
            .addCase(getAllNDREntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 📦 Update
            .addCase(updateNDRAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNDRAction.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.ndrs.findIndex((n) => n._id === action.payload._id);
                if (idx !== -1) {
                    state.ndrs[idx] = action.payload;
                }
            })
            .addCase(updateNDRAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // 📦 Delete
            .addCase(deleteNDREntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNDREntry.fulfilled, (state, action) => {
                state.loading = false;
                state.ndrs = state.ndrs.filter((n) => n._id !== action.payload);
            })
            .addCase(deleteNDREntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ndrSlice.reducer;



