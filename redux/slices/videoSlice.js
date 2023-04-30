import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  video: null,
  loading: false,
  error:null,
  likedVideo: [],
  savedVideo:[]
};
// const base = "http://192.168.0.100:5000";
const base = "https://gizmobackend-production.up.railway.app";

export const upVideo = createAsyncThunk("upVideo", async (formData) => {
  const res = await axios({
    method: "POST",
    url: `${base}/user/upload-video`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  }).then((data) => data);

  return res.data;
});

export const getLikeContent = createAsyncThunk(
  "LikeContent",
  async (arg) => {
    const {formData} = arg
    console.log("form", formData)
    const res = await axios({
      method: "POST",
      url: `${base}/user/get-liked-Content`,
      data: formData,
    }).then((data) => data);

    return res.data;
  }
);

export const getSavedContent = createAsyncThunk(
  "SavedContent",
  async (arg) => {
    const {formData} = arg
    console.log("form", formData)
    const res = await axios({
      method: "POST",
      url: `${base}/user/saved-content/get`,
      data: formData,
    }).then((data) => data);

    return res.data;
  }
);

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, action) => {
      state.video = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(upVideo.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.success) {
          state.video = payload.data;
        }
      })
      .addCase(upVideo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getLikeContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikeContent.fulfilled, (state, action) => {
        state.loading = false;
        state.likedVideo=action.payload.data
      })
      .addCase(getLikeContent.rejected, (state,error) => {
        state.loading = false;
      })
      .addCase(getSavedContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSavedContent.fulfilled, (state, action) => {
        state.loading = false;
        state.savedVideo=action.payload.data
      })
      .addCase(getSavedContent.rejected, (state,error) => {
        state.loading = false;
      });
  },
});

export const { setVideo } = videoSlice.actions;

export const selectVideo = (state) => state.video.video;
export const selectLikedVideo = (state) => state.video.likedVideo;
export const selectSavedVideo = (state) => state.video.savedVideo;
export const selectLoading = (state) => state.video.loading;

export default videoSlice.reducer;
