import { _serveAPI } from '@/api/service';
import { sentry_logger } from '@/utils/sentry_logger';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from './../index';

const initialState = {
  result: {
    name: '',
    about: '',
    tags: [],
    description: '',
    website_url: '',
    logo: '',
    banner: '',
    brand_colour: '',
    primary_offer: ''
  },
  currentTab:"about",
  walletId:279,
  loading: false,
  isResultOpen:false,
  error: ''
};

export const getSearchResult = createAsyncThunk('search/getSearchResult', async () => {
  return await _serveAPI({
    method: 'PATCH',
    endPoint: 'apdfdfi/admin/v2/getwallets'
  }).then((res) => {
    return res.data.details[0][0];
  }).catch((err) =>
  console.log('error')
);
});



export const Search = createSlice({
  name: 'search',
  initialState,

  reducers: {
    TOGGLE_RESULTS: (state, action) => {
        state.isResultOpen = action.payload
    },
    changeTab: (state,action)=>{
      state.currentTab=action.payload;
    },
    updateWalletId: (state,action)=>{
      state.walletId=action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getSearchResult.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.loading = false;
      state.result = action.payload;
      state.isResultOpen=true;
      state.error = '';
    });
    builder.addCase(getSearchResult.rejected, (state, action) => {
      state.loading = false;
      state.result = {
        name: '',
        about: '',
        tags: [],
        description: '',
        website_url: '',
        logo: '',
        banner: '',
        brand_colour: '',
        primary_offer: ''
      };
      state.error = action.error.message;
    });
  }


});

export const { TOGGLE_RESULTS,changeTab,updateWalletId } = Search.actions;
export const search = (state: AppState) => state.search;

export default Search.reducer;
