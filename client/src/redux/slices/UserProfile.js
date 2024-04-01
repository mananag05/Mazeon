"use client"

import { createSlice } from "@reduxjs/toolkit";


const UserProfile = createSlice({
     name : "UserProfile",
     initialState : {image : ""},
     reducers : {
        SetProfile : (curval, action ) => {
            return action.payload
        }
     }
})

export const {SetProfile} = UserProfile.actions;
export default UserProfile.reducer;

