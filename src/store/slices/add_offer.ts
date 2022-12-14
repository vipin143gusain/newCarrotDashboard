import { _serveAPI } from '@/api/service';
import { notify } from '@/utils/toaster';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../index';

export const getOffer = createAsyncThunk(
  'getOffer',
  async ({ walletId,qc_status }: { walletId: number; qc_status: string }) => {
    return await _serveAPI({
      method: 'GET',
      endPoint: qc_status?`api/wallet/offer?wallet_id=${walletId}&qc_status_asset=${qc_status}`:
      `api/wallet/offer?wallet_id=${walletId}`
    }).then((res) => res.data);
  }
);

export const deleteOffer = createAsyncThunk(
  'deleteAddOffer',
  async (offerId) => {
    return await _serveAPI({
      endPoint: `api/wallet/offer/v2/${offerId}`,
      method: 'DELETE'
    }).then((res) => res.message);
  }
);

export const updateOffer = createAsyncThunk(
  'walletProduct/updateProduct',
  async (data: object | any) => {
    return await _serveAPI({
      method: 'PUT',
      endPoint: `api/wallet/offer/${data.id}`,
      data
    }).then((res) => res);
  }
);

export const updateOfferv2 = createAsyncThunk(
  'walletProduct/updateOfferv2',
  async (data: object | any) => {
    return await _serveAPI({
      method: 'PUT',
        endPoint: `api/wallet/offer/v2/${data.id}`,
        data
    }).then((res) => res);
  }
);

export const addOfferWithdrawAction = createAsyncThunk(
  "wallet/addOfferWithdrawAction",
  async (id) => {
    return await _serveAPI({
      endPoint: `api/wallet/offer/v2/withdrawn/${id}`,
      method: 'PUT'
    }).then((res) => res);
  }
);

export const addOfferAction = createAsyncThunk(
  'walletProduct/addOfferAction',
  async (data: object | any) => {
    return await _serveAPI({
      method: 'POST',
      endPoint: 'api/wallet/offer/v2',
      data
    }).then((res) => res);
  }
);

export const addOfferActionNew = createAsyncThunk(
  'walletProduct/addOfferActionNew',
  async (data: object | any) => {
    return await _serveAPI({
      method: 'POST',
      endPoint: 'api/wallet/banner',
      data
    }).then((res) => res);
  }
);

export const addOfferEditRequest = createAsyncThunk(
  "walletProduct/editRequestAddOffer",
  async (id: object | any) => {
    return await _serveAPI({
      endPoint: `api/wallet/offer/v2/getEditedRequest/${id}`,
      method: 'GET'
    }).then((res) => res);
  }
);

export const AddOffer = createSlice({
  name: 'addOffer',

  initialState: {
    offers: [],
    loading: false,
    error: ''
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOffer.fulfilled, (state, action) => {
      state.loading = false;
      state.offers = action.payload;
      state.error = '';
    });
    builder.addCase(getOffer.rejected, (state, action) => {
      state.loading = false;
      state.offers = [];
      state.error = action.error.message;
    });

    builder.addCase(updateOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOffer.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      notify('success', action.payload);
    });
    builder.addCase(updateOffer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      notify('error', action.error.message);
    });

    builder.addCase(deleteOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOffer.fulfilled, (state, action) => {
      state.loading = false;

      state.error = '';
      notify('success', action.payload);
    });
    builder.addCase(deleteOffer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      notify('error', action.error.message);
    });
  }

  // extraReducers:{
  //     [HYDRATE] : (state, action)=>{
  //         //TODO: handle client side state override
  //         if(!action.payload.product)
  //         {
  //             return state
  //         }

  //         state.product = action.payload.product
  //         // state.banner = action.payload.fileUpload.banner;
  //     }
  // }
});

export const addOffer = (state: AppState) => state.addOffer.offers;
export const loadingAddOffer = (state: AppState) => state.addOffer.loading;

export default AddOffer.reducer;
