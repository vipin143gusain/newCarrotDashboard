import { AppState } from '../index';

import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';



export const ModalWatcherSlice = createSlice({
    name: 'modalWatcher',
    initialState:{
        open:false
    },
    reducers:{
        setModalState: (state, action)=>{
            state.open = action.payload;
        }
    },

    extraReducers:{
        [HYDRATE] : (state, action)=>{
            //TODO: handle client side state override
            if(!action.payload.modalWatcher.open)
            {
                return state
            }
            state.open = action.payload.modalWatcher.open;
        }
    }
})

export const { setModalState } = ModalWatcherSlice.actions

export const getModalState = (state:AppState) => state.modalWatcher.open

export default ModalWatcherSlice.reducer