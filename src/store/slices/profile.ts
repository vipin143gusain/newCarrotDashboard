import { AppState } from './../index';

import { _serveAPI } from '@/api/service';
import { Credentials } from '@/components/hero.component';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    accountaccess: '',
    adminaccess: '',
    business: '',
    campaignaccess: '',
    carrotaccess: '',
    carrotrole: '',
    commsaccess: '',
    contentaccess: '',
    customercare: '',
    email: '',
    firstname: '',
    id: 0,
    isactive: '',
    lastname: '',
    loginid: '',
    mobile: '',
    offersaccess: '',
    reporting: '',
    scratchaccess: '',
    status: '',
    superadmin: '',
    sysadmin: ''
  },
  loading: false,
  error: ''
};

export const getUser = createAsyncThunk(
  'user/getAuth',
  async (payload: Credentials) => {
    return await _serveAPI({
      endPoint: 'login',
      method: 'POST',
      data: payload
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
);

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,

  reducers: {
    setProfileData: (state, action) => {
      state.profile = action.payload;
    },
    clearProfileData: (state, action) => {
      state.profile = {
        accountaccess: '',
        adminaccess: '',
        business: '',
        campaignaccess: '',
        carrotaccess: '',
        carrotrole: '',
        commsaccess: '',
        contentaccess: '',
        customercare: '',
        email: '',
        firstname: '',
        id: 0,
        isactive: '',
        lastname: '',
        loginid: '',
        mobile: '',
        offersaccess: '',
        reporting: '',
        scratchaccess: '',
        status: '',
        superadmin: '',
        sysadmin: ''
      };
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = '';
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.profile = {
        accountaccess: '',
        adminaccess: '',
        business: '',
        campaignaccess: '',
        carrotaccess: '',
        carrotrole: '',
        commsaccess: '',
        contentaccess: '',
        customercare: '',
        email: '',
        firstname: '',
        id: 0,
        isactive: '',
        lastname: '',
        loginid: '',
        mobile: '',
        offersaccess: '',
        reporting: '',
        scratchaccess: '',
        status: '',
        superadmin: '',
        sysadmin: ''
      };
      state.error = action.error.message;
    });
    // [HYDRATE]: (state, action) => {
    //   //TODO: handle client side state override
    //   if (!action.payload.profile.name) {
    //     return state;
    //   }
    //   state.name = action.payload.profile.name;
    // }
  }
});

export const { setProfileData, clearProfileData } = ProfileSlice.actions;

export const selectProfile = (state: AppState) => state.profile;

export default ProfileSlice.reducer;
