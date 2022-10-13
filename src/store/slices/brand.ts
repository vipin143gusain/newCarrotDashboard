import { _serveAPI } from '@/api/service';
import { sentry_logger } from '@/utils/sentry_logger';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from './../index';

const initialState = {
  brand: {
    name: '',
    about: '',
    tags: [],
    description: '',
    website_url: '',
    logo: '',
    // banner_file_key: '',
    banner: '',
    brand_colour: '',
    primary_offer: ''
  },
  loading: false,
  error: ''
};

export const getBrand = createAsyncThunk('brand/getBrand', async () => {
  return await _serveAPI({
    method: 'POST',
    endPoint: 'api/admin/v2/getwallets'
  }).then((res) => {
    return res.data.details[0][0];
  }).catch((err) =>
  sentry_logger({
    error: err,
    trace: 'Calling API endpoint:' + 'getwallets',
    user: {
      key: 'Test',
      id: '1',
      ip_address: '1.0.1.0.1.0',
      email: 'test@test.com',
      username: 'Vipin_admin'
    }
  })
);;
});

export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  async (data) => {
    return await _serveAPI({
      method: 'POST',
      endPoint: `api/admin/wallet/update`,
      data
    }).then((res) => res.message);
  }
);

export const Brand = createSlice({
  name: 'brand',
  initialState,

  reducers: {
    UPDATE_BRAND: (state, action) => {
      state.brand = {
        ...state.brand,
        ...action.payload.data.data.details[0][0]
      };
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.error = '';
    });
    builder.addCase(getBrand.rejected, (state, action) => {
      state.loading = false;
      state.brand = {
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

    // ---------- UPDATE BRAND ----------------

    builder.addCase(updateBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBrand.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }

  // {
  //     [HYDRATE] : (state, action)=>{
  //         //TODO: handle client side state override
  //         if(!action.payload.brand)
  //         {
  //             return state
  //         }

  //         // state.name = action.payload.name
  //     }

  // }
});

export const { UPDATE_BRAND } = Brand.actions;

export const brand = (state: AppState) => state.brand.brand;

export default Brand.reducer;
