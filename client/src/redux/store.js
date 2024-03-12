import { configureStore } from "@reduxjs/toolkit";
import FormDataSlice from './slices/formdata';


export const reduxstore = configureStore({
    reducer : {
        TOGGLE : FormDataSlice
    }
})