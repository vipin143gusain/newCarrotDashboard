import { AppState } from '../index';

import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

export const FileUpload = createSlice({
    name: 'fileUpload',

    initialState:{
        logo:"",
        banner:""
    },
    reducers:{
        setLogo: (state, action)=>{
            state.logo = action.payload;
        },
        setBanner: (state, action)=>{
            state.banner = action.payload;
        }
    },

    extraReducers:{
        [HYDRATE] : (state, action)=>{
            //TODO: handle client side state override
            if(!action.payload.fileUpload.logo)
            {
                return state
            }
            
            state.logo = action.payload.fileUpload.logo;
            state.banner = action.payload.fileUpload.banner;
        }
    }
})

export const { setLogo,setBanner } = FileUpload.actions

export const getFileUpload = (state:AppState) => state.fileUpload



export default FileUpload.reducer