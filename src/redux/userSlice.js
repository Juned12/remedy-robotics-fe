import { createSlice } from "@reduxjs/toolkit";

export const UserDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        details: {
            isAuthenticated: false
        }
    },
    reducers: {
        setUserDetails: (state, action) => {
            state.details = action.payload
        },
        clearUserDetails: (state) => {
            state.details = {}
        }
    }
})

export const { setUserDetails, clearUserDetails } = UserDetailsSlice.actions;

export default UserDetailsSlice.reducers;