// import { HYDRATE } from 'next-redux-wrapper';
import { _serveAPI } from "@/api/service";
import { notify } from "@/utils/toaster";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../index";

export const getCategory = createAsyncThunk("wallet/getCategory", async ({walletId,qc_status}:{walletId:number,qc_status:string}) => {
  return await _serveAPI({
    method: "GET",
    endPoint: qc_status?
    `api/wallet/category?wallet_id=${walletId}&qc_status_asset=${qc_status}`
    :`api/wallet/category?wallet_id=${walletId}`,
  }).then((res) => res.data);
});

export const addWalletCategoryAction = createAsyncThunk(
  "wallet/addWalletCategory",
  async (payload: object) => {
    return await _serveAPI({
      endPoint: "api/wallet/category/v2",
      method: "POST",
      data: payload,
    }).then((res) => res);
  }
);

export const updateCategory = createAsyncThunk(
  "wallet/updateCategory",
  async (data: object) => {
    return await _serveAPI({
      endPoint: `api/wallet/category/v2/${data.id}`,
      method: "PUT",
      data,
    }).then((res) => res);
  }
);

export const deleteCategoryAction = createAsyncThunk(
  "wallet/deleteCategoryAction",
  async (categoryId) => {
    return await _serveAPI({
      endPoint: `api/wallet/category/v2/${categoryId}`,
      method: "DELETE",
    }).then((res) => res);
  }
);

export const categoryWithdrawAction = createAsyncThunk(
  "wallet/categoryWithdrawAction",
  async (id) => {
    return await _serveAPI({
      endPoint: `api/wallet/category/v2/withdrawn/${id}`,
      method: 'PUT'
    }).then((res) => res);
  }
);

export const categoryEditRequest = createAsyncThunk(
  "walletProduct/editRequestCategory",
  async (id: object | any) => {
    return await _serveAPI({
      endPoint: `api/wallet/category/v2/getEditedRequest/${id}`,
      method: 'GET'
    }).then((res) => res);
  }
);


export const WalletCategory = createSlice({
  name: "walletCategory",

  initialState: {
    category: [],
    loading: false,
    error: "",
  },

  reducers: {
    addCategory: (state, action) => {
      state.category = [...state.category, action.payload];
    },
    deleteCategory: (state, action) => {
      state.category = state.category.filter(
        (categ) => categ.id != action.payload
      );
    },
    editCategoryAction: (state, action) => {
      state.category = state.category.filter(
        (prod) => prod.id != action.payload.id
      );
      state.category = [...state.category, action.payload];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.error = "";
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      state.category = [];
      state.error = action.error.message;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      notify("success", action.payload.message);
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      notify("error", action.error.message);
    });

    builder.addCase(addWalletCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addWalletCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      notify("success", action.payload.message);
    });
    builder.addCase(addWalletCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      notify("error", action.error.message);
    });

    builder.addCase(deleteCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      notify("success", action.payload.message);
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      notify("error", action.error.message);
    });
  },
});

export const { addCategory, deleteCategory, editCategoryAction } =
  WalletCategory.actions;

export const walletCategory = (state: AppState) =>
  state.walletCategory.category;
export const loadingCategory = (state: AppState) =>
  state.walletCategory.loading;

export default WalletCategory.reducer;
