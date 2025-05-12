import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import albumReducer from "./AlbumSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    albums: albumReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
