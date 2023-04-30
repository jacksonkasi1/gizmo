import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  report: [],
  id: [{ id: "", category: "" }],
  categoryBrand:[],
  forgotPass:null,
  like:null,
  dislike:null,
  replayComment:null,
  saveData:[],
  loading: false,
};
// const base = "http://192.168.0.100:5000";
const base = "https://gizmobackend-production.up.railway.app";

export const addReport = createAsyncThunk("addReport", async (arg) => {
  const { formData } = arg;
  const res = await axios({
    method: "POST",
    url: `${base}/add-report`,
    data: formData,
  }).then((data) => data);

  return res.data;
});

export const getCategoryBrand = createAsyncThunk(
  "categoryBrand",
  async (arg) => {
    const { formData } = arg;
    const res = await axios({
      method: "POST",
      url: `${base}/get/category-brand`,
      data: formData,
    }).then((data) => data);

    return res.data;
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (arg) => {
    const { formData } = arg;
    const res = await axios({
      method: "POST",
      url: `${base}/user/forget-password`,
      data: formData,
    }).then((data) => data);

    return res.data;
  }
);

export const likeContent = createAsyncThunk("likeContent", async (arg) => {
  const { formData } = arg;
  const res = await axios({
    method: "POST",
    url: `${base}/user/liked`,
    data: formData,
  }).then((data) => data);

  return res.data;
});

export const dislikeContent = createAsyncThunk("dislikeContent", async (arg) => {
  const { formData } = arg;
  const res = await axios({
    method: "POST",
    url: `${base}/user/disliked`,
    data: formData,
  }).then((data) => data);

  return res.data;
});

export const addReplyComment = createAsyncThunk("addReplyComment", async (arg) => {
  const { formData } = arg;
  const res = await axios({
    method: "POST",
    url: `${base}/user/comments/replay`,
    data: formData,
  }).then((data) => data);

  return res.data;
});

export const saveContent = createAsyncThunk("saveContent", async (arg) => {
  const { formData } = arg;
  const res = await axios({
    method: "POST",
    url: `${base}/user/saved-content`,
    data: formData,
  }).then((data) => data);

  return res.data;
});

export const mainSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setId: (state, action) => {
      // console.log("id set id", action.payload)
      (state.id[0].id = action.payload.id),
        (state.id[0].category = action.payload.category);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReport.fulfilled, (state, action) => {
        // console.log("poll", action.payload)
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(addReport.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCategoryBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoryBrand.fulfilled, (state, action) => {
        // console.log("poll", action.payload)
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(getCategoryBrand.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        // console.log("poll", action.payload)
        state.loading = false;
        state.forgotPass = action.payload;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(likeContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        // console.log("poll", action.payload)
        state.loading = false;
        state.like = action.payload;
      })
      .addCase(likeContent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(dislikeContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(dislikeContent.fulfilled, (state, action) => {
        // console.log("poll", action.payload)
        state.loading = false;
        state.like = action.payload;
      })
      .addCase(dislikeContent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addReplyComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReplyComment.fulfilled, (state, action) => {
        // console.log("poll", action.payload)
        state.loading = false;
        state.replayComment = action.payload;
      })
      .addCase(addReplyComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(saveContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveContent.fulfilled, (state, action) => {
        // console.log("poll", action.payload)
        state.loading = false;
        state.saveData = action.payload;
      })
      .addCase(saveContent.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const { setId } = mainSlice.actions;
// export const selectId = (state)=>state?.report?.id;
// export const selectReport = (state) => state?.report?.report;
// export const selectLoading = (state) => state.report.loading;

export default mainSlice.reducer;
