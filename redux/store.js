import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import videoReducer from "./slices/videoSlice";
import photoReducer from "./slices/photoSlice";
import userReducer from "./slices/userSlice";
import statusReducer from "./slices/statusSlice";
import reviewReducer from "./slices/reviewSlice";
import pollReducer from "./slices/pollSlice";
import mainReducer from "./slices/mainSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    photo: photoReducer,
    user: userReducer,
    status: statusReducer,
    review:reviewReducer,
    poll:pollReducer,
    main: mainReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
