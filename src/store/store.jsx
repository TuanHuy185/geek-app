import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from "./UserSlice";
import albumReducer from "./AlbumSlice";

// Configure persistence for each reducer
const userPersistConfig = {
  key: 'users',
  storage,
  whitelist: ['users', 'todos'] // only these will be persisted
};

const albumPersistConfig = {
  key: 'albums',
  storage,
  whitelist: ['albums', 'photos'] // only these will be persisted
};

// Create persisted reducers
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAlbumReducer = persistReducer(albumPersistConfig, albumReducer);

// Root reducer
const rootReducer = combineReducers({
  users: persistedUserReducer,
  albums: persistedAlbumReducer,
});

// Create store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;
