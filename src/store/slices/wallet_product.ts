
import { _serveAPI } from "@/api/service";
import { notify } from "@/utils/toaster";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../index";

export const addWalletProductAction = createAsyncThunk(
  "walletProduct/addWalletProduct",
  async (payload: object) =>
    await _serveAPI({
      endPoint: "api/wallet/product/v2",
      method: "POST",
      data: payload,
    }).then((res) => res)
);

export const getProduct = createAsyncThunk(
  "walletProduct/getProduct",
  async ({walletId,qc_status}:{walletId:number,qc_status:string}) => {
    return await _serveAPI({
      method: "GET",
      endPoint: qc_status?`api/wallet/product?wallet_id=${walletId}&qc_status_asset=${qc_status}`:
      `api/wallet/product?wallet_id=${walletId}`
      ,
    }).then((res) => res.data);
  }
);

export const deleteProductAction = createAsyncThunk(
  "walletProduct/deleteProductAction",
  async (productId) => {
    return await _serveAPI({
      endPoint: `api/wallet/product/v2/${productId}`,
      method: "DELETE",
    }).then((res) => res.message);
  }
);

export const updateProduct = createAsyncThunk(
  "walletProduct/updateProduct",
  async (data: object | any) => {
    return await _serveAPI({
      method: "PUT",
      endPoint: `api/wallet/product/v2/${data.id}`,
      data,
    }).then((res) => res.message);
  }
);

export const approveProductAction = createAsyncThunk(
  "walletProduct/approveProduct",
  async ({data,id}: object | any) => {
    return await _serveAPI({
      method: 'PATCH',
      endPoint: `api/qcintegration/approve/${id}`,
      data,
    }).then((res) => res);
  }
);

export const rejectProductAction = createAsyncThunk(
  "walletProduct/rejectProduct",
  async ({data,id}: object | any) => {
    return await _serveAPI({
      method: 'PATCH',
      endPoint: `api/qcintegration/reject/${id}`,
      data,
    }).then((res) => res);
  }
);

export const withdrawProductAction = createAsyncThunk(
  "walletProduct/withdrawProduct",
  async (id: object | any) => {
    return await _serveAPI({
      endPoint: `api/wallet/product/v2/withdrawn/${id}`,
      method: 'PUT'
    }).then((res) => res);
  }
);

export const productEditRequest = createAsyncThunk(
  "walletProduct/editRequestProduct",
  async (id: object | any) => {
    return await _serveAPI({
      endPoint: `api/wallet/product/v2/getEditedRequest/${id}`,
      method: 'GET'
    }).then((res) => res);
  }
);

export const WalletProduct = createSlice({
  name: "walletProduct",

  initialState: {
    product: [],
    loading: false,
    error: "",
  },

  reducers: {
    addProduct: (state, action) => {
      state.product = [...state.product, action.payload];
    },
    loadSearchProduct:(state,action)=>{
      state.product = action.payload;
    },
    deleteProduct: (state, action) => {
      state.product = state.product.filter((prod) => prod.id != action.payload);
    },
    editProductAction: (state, action) => {
      state.product = state.product.filter(
        (prod) => prod.id != action.payload.id
      );
      state.product = [...state.product, action.payload];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = "";
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.loading = false;
      state.product = [];
      state.error = action.error.message;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      notify("success", action.payload);
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      notify("error", action.error.message);
    });

    builder.addCase(addWalletProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addWalletProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      notify("success", action.payload.message);
    });
    builder.addCase(addWalletProductAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      notify("error", action.error.message);
    });

    builder.addCase(deleteProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.loading = false;

      state.error = "";
      notify("success", action.payload);
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      notify("error", action.error.message);
    });
  },

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

export const { addProduct, deleteProduct, editProductAction,loadSearchProduct } =
  WalletProduct.actions;

export const walletProduct = (state: AppState) => state.walletProduct.product;
export const loadingProduct = (state: AppState) => state.walletProduct.loading;

export default WalletProduct.reducer;
