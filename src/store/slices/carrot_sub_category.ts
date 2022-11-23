import { _serveAPI } from "@/api/service";
import { notify } from "@/utils/toaster";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../index";

export const createSubCateoryAction = createAsyncThunk(
    "carrotSubCategory/createSubCarrotCategory",
    async (payload: object) => {
      return await _serveAPI({
        endPoint: 'api/subcategory',
        method: 'POST',
        data: payload,
      }).then((res) => res)

    }
  );


export const editSubCateoryAction = createAsyncThunk(
    "carrotSubCategory/editSubCarrotCategory",
    async (payload: object) => {
      return await _serveAPI({
        endPoint: `api/subcategory/${payload.id}`,
        method: 'PUT',
        data: payload
      }).then((res) => res)

    }
  );

export const deleteSubCategoryAction = createAsyncThunk(
    "carrotSubCategory/deleteSubCarrotCategory",
    async ({payload,value}: object) => {
      return await _serveAPI({
        endPoint: `api/subcategory/${value.id}`,
        method: 'DELETE',
        data: payload,
      }).then((res) => res)

    }
  );