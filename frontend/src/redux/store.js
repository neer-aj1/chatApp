import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage  from "redux-persist/lib/storage";
import selectChat  from "./slices/chatSelectSlice";
import messages from "./slices/messageSlice";
const rootReducer = combineReducers({
  user: userSlice,
  selectChat,
  messages
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedState = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store);