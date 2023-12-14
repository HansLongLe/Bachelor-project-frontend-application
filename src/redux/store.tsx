import { combineReducers, configureStore } from "@reduxjs/toolkit";
import connectionSliceReducer from "./slices/connectionSlice";

export const reducers = combineReducers({
  connection: connectionSliceReducer
});

const ReduxPromise = require("redux-promise");
const middleware = [ReduxPromise.default];
export const store = configureStore({
  reducer: reducers,
  middleware: middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
