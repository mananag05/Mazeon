import { configureStore } from "@reduxjs/toolkit";
import FormDataSlice from './slices/formdata';
import UserProfile from "./slices/UserProfile";
import sidenav from "./slices/sidenav";


export const reduxstore = configureStore({
    reducer : {
        TOGGLE : FormDataSlice,
        PROFILE  : UserProfile,
        SIDENAV : sidenav
    }
})