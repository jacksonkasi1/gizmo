import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userContent: null,
  followerContents: null,
  loading: false,
  userId: null,
};
// const base = "http://192.168.0.100:5000";
const base = "https://gizmobackend-production.up.railway.app";

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (token) => {
    //   const { formData, user_id } = arg;
    // console.log("id",token);
    const res = await axios({
      method: "POST",
      url: `${base}/user/userDetails`,
      headers: {
        Authorization: token,
      },
    }).then((data) => data);

    return res.data;
  }
);
export const getUserContent = createAsyncThunk(
  "getUserContent",
  async (arg) => {
    const { formData, user_id } = arg;
    console.log("id", user_id);
    const res = await axios({
      method: "GET",
      url: `${base}/user/get-content?user_id=${user_id}`,
    }).then((data) => data);

    return res.data;
  }
);
export const getFollowersContent = createAsyncThunk(
  "getFollowersContent",
  async (id) => {
    //   const { formData, user_id } = arg;
    //   console.log("id", user_id);
    const res = await axios({
      method: "GET",
      url: `${base}/user/followers-content?user_id=${id}`,
    }).then((data) => data);

    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.data.getParticularUser.user_id;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserContent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserContent.fulfilled, (state, action) => {
        state.loading = false;
        state.userContent = action.payload.data;
      })
      .addCase(getFollowersContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowersContent.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.success) {
          state.followerContents = payload.data;
        }
      })
      .addCase(getFollowersContent.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectUserId = (state) => state.user.userId;
export const selectFollowersContent = (state) => state.user.followerContents;
export const selectUserContent = (state) => state.user.userContent;

export const selectLoading = (state) => state.user.loading;

export default userSlice.reducer;
