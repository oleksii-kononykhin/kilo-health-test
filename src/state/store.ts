import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

import quizReducer from "./quiz";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "quiz-flow-boilerplate",
  storage: storageSession,
};

export const configStore = () => {
  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
      quiz: quizReducer,
    })
  );
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  return {
    store,
    persistor: persistStore(store),
  };
};

export const { store, persistor } = configStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
