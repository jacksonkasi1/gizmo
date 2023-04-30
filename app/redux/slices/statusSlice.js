import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  statusData: [],
};
// const base = "http://192.168.0.100:5000";
const base = "https://gizmobackend-production.up.railway.app";

export const addStatus = createAsyncThunk(
  "addStatus",
  async (arg) => {
      const { formData, user_id } = arg;
      console.log("id", user_id);
    const res = await axios({
      method: "POST",
      url: `${base}/user/user-status/add?user_id=${user_id}`,
      data: formData
    }).then((data) => data);

    return res.data;
  }
);

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStatus.fulfilled, (state,action) => {
        state.loading = false;
        state.statusData=action.payload
      })
      .addCase(addStatus.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const selectStatus = (state) => state.status.statusData;

export const selectLoading = (state) => state.user.loading;

export default statusSlice.reducer;
