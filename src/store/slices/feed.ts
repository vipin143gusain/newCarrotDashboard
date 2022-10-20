import { _serveAPI } from "@/api/service";
import { notify } from "@/utils/toaster";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./../index";

export const getFeedCategory = createAsyncThunk(
  "feed/getFeedCategory",
  async () => {
    return await _serveAPI({
      method: 'GET',
      endPoint: 'api/category?status=1'
    }).then((res) => { return res.data});
  }
);
export const getFeedSubCategory = createAsyncThunk(
  "feed/getFeedSubCategory",
  async () => {
    return await _serveAPI({
      method: 'GET',
      endPoint: 'api/subcategory'
    }).then((res) => { return res.data});
  }
);

export const getFeedTheme = createAsyncThunk(
  "feed/getFeedTheme",
  async () => {
    return await _serveAPI({
      method: 'GET',
        endPoint:
          'fppublic/api/wallet/banner/themes'
    }).then((res) => { return res.data});
  }
);
export const getChannel = createAsyncThunk(
  "feed/getChannel",
  async () => {
    return await _serveAPI({
      method: 'POST',
        endPoint:
          'api/admin/channel'
    }).then((res) => { return res.data});
  }
);
export const getFeedTags = createAsyncThunk(
  "feed/getFeedTags",
  async () => {
    return await _serveAPI({
      method: 'GET',
        endPoint:
          'fppublic/api/wallet/banner/tags'
    }).then((res) => { return res.data});
  }
);

export const getFeedCards = createAsyncThunk(
  "feed/getFeedCards",
  async ({walletId,qc_status}:{walletId:number,qc_status:string}) => {
    return await _serveAPI({
      endPoint: qc_status?`api/wallet/banner?wallet_id=${walletId}&qc_status_asset=${qc_status}`:
      `api/wallet/banner?wallet_id=${walletId}`
      ,
      method: "GET",
    }).then((res) => { return res.data});
  }
);
export const deleteFeedCard = createAsyncThunk(
  "feed/deleteFeedCard",
  async (feedCardId: number) => {
    return await _serveAPI({
      endPoint: `api/wallet/banner/v2/${feedCardId}`,
      method: "DELETE",
    }).then((res) => { return res});
  }
);

export const Feed = createSlice({
  name: "feed",

  initialState: {
    feedCards: [],
    categoryList:[],
    subCategoryList:[],
    themeList:[],
    tagList:[],
    channelList:[],
    loading: false,
    error: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getFeedCards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFeedCards.fulfilled, (state, action) => {
      state.loading = false;
      state.feedCards = action.payload;
      state.error = "";
    });
    builder.addCase(getFeedCards.rejected, (state, action) => {
      state.loading = false;
      state.feedCards = [];
      state.error = action.error.message;
    });

    //  ------ category list ---------

    builder.addCase(getFeedCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFeedCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryList = action.payload;
      state.error = "";
    });
    builder.addCase(getFeedCategory.rejected, (state, action) => {
      state.loading = false;
      state.categoryList = [];
      state.error = action.error.message;
    });
    //  --------- sub category -------
    builder.addCase(getFeedSubCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFeedSubCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.subCategoryList = action.payload;
      state.error = "";
    });
    builder.addCase(getFeedSubCategory.rejected, (state, action) => {
      state.loading = false;
      state.subCategoryList = [];
      state.error = action.error.message;
    });

    // --------- theme ---------------
    builder.addCase(getFeedTheme.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFeedTheme.fulfilled, (state, action) => {
      state.loading = false;
      state.themeList = action.payload;
      state.error = "";
    });
    builder.addCase(getFeedTheme.rejected, (state, action) => {
      state.loading = false;
      state.themeList = [];
      state.error = action.error.message;
    });
    // --------- tags ---------------
    builder.addCase(getFeedTags.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFeedTags.fulfilled, (state, action) => {
      state.loading = false;
      state.tagList = action.payload;
      state.error = "";
    });
    builder.addCase(getFeedTags.rejected, (state, action) => {
      state.loading = false;
      state.tagList = [];
      state.error = action.error.message;
    });
    // ------- channels -------------
    builder.addCase(getChannel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChannel.fulfilled, (state, action) => {
      state.loading = false;
      state.channelList = action.payload;
      state.error = "";
    });
    builder.addCase(getChannel.rejected, (state, action) => {
      state.loading = false;
      state.channelList = [];
      state.error = action.error.message;
    });

    // ------- DELETE FEED CARD ACTION -----------
    builder.addCase(deleteFeedCard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFeedCard.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      notify("success", action.payload.message);
    });
    builder.addCase(deleteFeedCard.rejected, (state, action) => {
      state.loading = false;
      state.feedCards = [];
      state.error = action.error.message;
      notify("error", action.error.message);
    });
  },
});

// export const { getFeedCards } = Feed.actions

export const feedCards = (state: AppState) => state.feed.feedCards;
export const categoryList = (state: AppState) => state.feed.categoryList;
export const subCategoryList = (state: AppState) => state.feed.subCategoryList;
export const themeList = (state: AppState) => state.feed.themeList;
export const tagList = (state: AppState) => state.feed.tagList;
export const channelList = (state: AppState) => state.feed.channelList;
export const loadingFeed = (state: AppState) => state.feed.loading;

export default Feed.reducer;
