import { configureStore } from "@reduxjs/toolkit";
import { UserDetailsSlice } from "./userSlice";

export default configureStore({
    reducer: {
        userDetails: UserDetailsSlice.reducer
    }
})