import { _serveAPI } from "@/api/service";
import { notify } from "@/utils/toaster";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../index";

export const createCategoryAction = createAsyncThunk(
    "carrotCategory/addCarrotCategory",
    async (payload: object) => {
      return await _serveAPI({
        endPoint: 'api/category',
        method: 'POST',
        data: payload,
      }).then((res) => res)

    }
  );

export const editCarrotCategoryAction = createAsyncThunk(
    "carrotCategory/editCarrotCategory",
    async (payload: object) => {
      return await _serveAPI({
        endPoint: `api/category/${payload.id}`,
          data: payload,
          method: 'PUT'
      }).then((res) => res)

    }
  );

  export const deleteCarrotCategory = createAsyncThunk(
    "carrotCategory/deleteCarrotCategory",
    async ({payload,value}: object) => {
      return await _serveAPI({
        endPoint: `api/category/${value.id}`,
        method: 'DELETE',
        data: payload,
      }).then((res) => res)

    }
  );