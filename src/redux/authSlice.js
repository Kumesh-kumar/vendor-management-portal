import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../utils/Storage";

const storedUser = getItem("user");

const initialState = {
    user: storedUser || null,
    role: storedUser?.role || null,
    isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;