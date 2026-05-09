import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiEndpoints } from '../../api/ApiURLs';

export const fetchAdmins = createAsyncThunk(
    'admins/fetchAdmins',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(ApiEndpoints.fetchAdmins);
            return res.data || [];
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch admins");
        }
    }
);

const adminSlice = createSlice({
    name: 'admins',
    initialState: {
        list: [],
        loading: false,
        error: null,
        lastFetched: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdmins.pending, (state) => { state.loading = true; })
            .addCase(fetchAdmins.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
                state.lastFetched = Date.now();
                state.error = null;
            })
            .addCase(fetchAdmins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default adminSlice.reducer;