import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  poll: [],
  loading: false,
}
// const base = "http://192.168.0.100:5000";
const base = "https://gizmobackend-production.up.railway.app";

export const addPoll = createAsyncThunk("upPoll", async (arg) => {
    const {formData,user_id}=arg
    // console.log("id",user_id)
    // console.log("formdata", formData)
  const res = await axios({
    method: "POST",
    url: `${base}/user/user-pool/add?user_id=${user_id}`,
    data: formData,
  }).then((data) => data)

  return res.data;
});

export const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPoll.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPoll.fulfilled, (state,action) => {
        // console.log("poll", action.payload)
        state.loading = false;
        state.poll=action.payload
      })
      .addCase(addPoll.rejected, (state) => {
        state.loading = false;
      });
  },
});


export const selectPoll = (state) => state.poll.poll;
export const selectLoading = (state) => state.poll.loading;

export default pollSlice.reducer;
