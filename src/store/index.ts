import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { Action, combineReducers } from "redux";
import brand from "./slices/brand";
import feed from "./slices/feed";
import fileUpload from "./slices/file_upload";
import modalWatcher from "./slices/modal_watcher";
import profileReducer from "./slices/profile";
import walletCategory from "./slices/wallet_category";
import walletProduct from "./slices/wallet_product";
import addOffer from "./slices/add_offer";

const reducers = combineReducers({
  brand,
  feed,
  addOffer,
  profile: profileReducer,
  modalWatcher: modalWatcher,
  fileUpload: fileUpload,
  walletProduct: walletProduct,
  walletCategory: walletCategory,
});

const makeStore = () =>
  configureStore({
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
