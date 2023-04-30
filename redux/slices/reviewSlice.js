import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  review: [],
  comment:[],
  loading: false,
}
// const base = "http://192.168.0.100:5000";
const base = "https://gizmobackend-production.up.railway.app";

export const addReview = createAsyncThunk("upReview", async (arg) => {
    const {formData,user_id}=arg
    // console.log("id",user_id)
    // console.log("formdata", formData)
  const res = await axios({
    method: "POST",
    url: `${base}/user/user-review/add?user_id=${user_id}`,
    data: formData,
  }).then((data) => data)

  return res.data;
});
export const addReviewComment = createAsyncThunk(
  "addCommentReview",
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
export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state,action) => {
        // console.log("revi", action.payload)
        state.loading = false;
        state.review=action.payload
      })
      .addCase(addReview.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addReviewComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReviewComment.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action at review comment",action.payload)
        if (action.payload.success) {
          state.comment = action.payload;
        }
      })
      .addCase(addReviewComment.rejected, (state) => {
        state.loading = false;
      })
  },
});


export const selectReview = (state) => state.getReview.review;
export const selectLoading = (state) => state.review.loading;
export const selectComment = (state) =>state.review.comment

export default reviewSlice.reducer;
