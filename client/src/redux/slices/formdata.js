"use client"

import { createSlice } from "@reduxjs/toolkit";


const FormDataSlice = createSlice({
     name : "FormDataSlice",
     initialState : "signin",
     reducers : {
        toggle : (curval, action ) => {
            if(action.payload === "signin"){
                return "signup"
              } else {
                return "signin"
              }
        }
     }
})

export const {toggle} = FormDataSlice.actions;
export default FormDataSlice.reducer;

