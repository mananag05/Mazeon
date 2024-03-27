import { configureStore } from "@reduxjs/toolkit";
import FormDataSlice from './slices/formdata';
import UserProfile from "./slices/UserProfile";

export const reduxstore = configureStore({
    reducer : {
        TOGGLE : FormDataSlice,
        PROFILE  : UserProfile
    }
})