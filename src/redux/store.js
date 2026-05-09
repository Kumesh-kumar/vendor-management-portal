import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import vendorReducer from './slices/vendorSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vendors: vendorReducer,
        admins: adminReducer,
    },
});