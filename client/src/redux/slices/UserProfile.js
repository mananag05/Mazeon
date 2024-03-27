"use client"

import { createSlice } from "@reduxjs/toolkit";


const UserProfile = createSlice({
     name : "UserProfile",
     initialState : {},
     reducers : {
        SetProfile : (curval, action ) => {
            console.log(action.payload)
        }
     }
})

export const {SetProfile} = UserProfile.actions;
export default UserProfile.reducer;

