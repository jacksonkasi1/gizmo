// Import the RTK Query methods from the React-specific entry point
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Video", "Login", "flw"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gizmobackend-production.up.railway.app",
    // bnaseUrl: "http://192.168.0.100:5000",
    prepareHeaders: (headers, { getState, endpoint }) => {
      // const token = getState().auth.token;

      // AsyncStorage.getItem("token").then((value) => {
      //   if (endpoint == "getUserDetails") {
      //     // console.log("ap", value);
      //     headers.set("Authorization", `${value}`);
      //   } else if (endpoint == "shareVideo") {
      //     console.log(getState());
      //   }
      // });
      // console.log("ed", endpoint);
      // console.log("rf", tkn);

      return headers;
    },
    // baseUrl: "http://192.168.0.103:5000",
  }),
  endpoints: (builder) => ({
    // getUserDetails: builder.query({
    //   query: () => ({ url: `/user/userDetails` }),
    //   providesTags: ["Login"],
    // }),
    getUserVideo: builder.query({
      query: (arg) => {
        const { user_id } = arg;
        return { url: `/user/user-video/get?user_id=${user_id}` };
      },
      providesTags: ["Video"],
    }),
    getFollowVideo: builder.query({
      query: (arg) => {
        const { user_id } = arg;
        return { url: `/user/followers-content?user_id=${user_id}` };
      },
      providesTags: ["Video"],
    }),
    verifyOtp: builder.mutation({
      query: (formData) => ({
        url: "/user/verification",
        method: "POST",
        // Include the entire post object as the body of the request
        body: formData,
      }),
    }),
    signUp: builder.mutation({
      query: (formData) => ({
        url: "/add/user",
        method: "POST",
        // Include the entire post object as the body of the request
        body: formData,
      }),
    }),
    logIn: builder.mutation({
      query: (formData) => ({
        url: "/user/login",
        method: "POST",
        // Include the entire post object as the body of the request
        body: formData,
      }),
      invalidatesTags: ["Login"],
    }),
    uploadVideo: builder.mutation({
      query: (formData) => ({
        url: "/user/upload-video",
        method: "POST",
        // Include the entire post object as the body of the request
        body: formData,
      }),
    }),
    likeVideo: builder.mutation({
      query: (arg) => {
        const { formData, vdId } = arg;
        //  console.log("kll", userId);
        return {
          url: `/user/user-liked/Video?video_id=${vdId}`,
          method: "PATCH",
          // Include the entire post object as the body of the request
          body: formData,
        };
      },
      invalidatesTags: ["Video"],
    }),
    // disLikeVideo: builder.mutation({
    //   query: (formData) => {
    //     const { formData, vdId } = arg;
    //     //  console.log("kll", userId);
    //     return {
    //       url: `/user/user-liked/Video?video_id=${vdId}`,
    //       method: "POST",
    //       // Include the entire post object as the body of the request
    //       body: formData,
    //     };
    //   },
    // }),
    shareVideo: builder.mutation({
      query: (arg) => {
        const { formData, userId } = arg;
        // console.log("kll", userId);
        return {
          url: `/user/user-video/upload?user_id=${userId}`,
          method: "POST",
          // Include the entire post object as the body of the request
          body: formData,
        };
      },
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useLogInMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
  useUploadVideoMutation,
  useShareVideoMutation,
  useGetUserVideoQuery,
  useGetFollowVideoQuery,
  useLikeVideoMutation,
} = apiSlice;

// data,isLoading,isFetching,isSuccess,isError,error
