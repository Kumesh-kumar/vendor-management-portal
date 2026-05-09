import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiEndpoints } from '../../api/ApiURLs';

export const fetchVendors = createAsyncThunk(
    'vendors/fetchVendors',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(ApiEndpoints.fetchVendors);
            return res.data || [];
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch vendors");
        }
    }
);

export const addVendor = createAsyncThunk(
    'vendors/addVendor',
    async (newVendor, { dispatch }) => {
        await axios.post(ApiEndpoints.fetchVendors, newVendor);
        dispatch(fetchVendors());
    }
);

export const updateVendor = createAsyncThunk(
    'vendors/updateVendor',
    async ({ id, ...data }, { dispatch }) => {
        await axios.patch(`${ApiEndpoints.fetchVendors}/${id}`, data);
        dispatch(fetchVendors());
    }
);

export const deleteVendor = createAsyncThunk(
    'vendors/deleteVendor',
    async (id, { dispatch }) => {
        await axios.delete(`${ApiEndpoints.fetchVendors}/${id}`);
        dispatch(fetchVendors());
    }
);

const vendorSlice = createSlice({
    name: 'vendors',
    initialState: {
        list: [],
        loading: false,
        error: null,
        lastFetched: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendors.pending, (state) => { state.loading = true; })
            .addCase(fetchVendors.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
                state.lastFetched = Date.now();
                state.error = null;
            })
            .addCase(fetchVendors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default vendorSlice.reducer;