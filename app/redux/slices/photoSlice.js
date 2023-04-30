import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  photo: null,
  comment: null,
  commentData:null,
  loading: false,
};
// const base = "http://192.168.0.100:5000";
const base = "https://gizmobackend-production.up.railway.app";

export const upPhoto = createAsyncThunk("upPhoto", async (arg) => {
  const { formData, user_id } = arg;
  console.log("id", user_id);
  const res = await axios({
    method: "POST",
    url: `${base}/user/user-photos/upload?user_id=${user_id}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  }).then((data) => data);

  return res.data;
});

export const addComment = createAsyncThunk(
  "addComment",
  async (arg) => {
      const { formData, user_id } = arg;
      console.log("id add comment", user_id);
    const res = await axios({
      method: "POST",
      url: `${base}/user/comment/add`,
      data: formData
    }).then((data) => data);

    return res.data;
  }
);

export const getComment = createAsyncThunk(
  "getComment",
  async (arg) => {
      const { post_id, user_id } = arg;
      console.log("id", user_id,post_id);
    const res = await axios({
      method: "GET",
      url: `${base}/user/photos-comment/get?user_id=${user_id}&photos_id=${post_id}`,
    }).then((data) => data);

    return res.data;
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(upPhoto.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.photo = action.payload;
        }
      })
      .addCase(upPhoto.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action at post comment",action.payload)
        if (action.payload.success) {
          state.comment = action.payload;
        }
      })
      .addCase(addComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.commentData = action.payload.data;
        }
      })
      .addCase(getComment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPhoto } = photoSlice.actions;

export const selectPhoto = (state) => state.photo.photo;
export const selectComment = (state) =>state.photo.comment
export const selectLoading = (state) => state.photo.loading;
export const selectAddComment = (state) => state.photo.commentData

export default photoSlice.reducer;
