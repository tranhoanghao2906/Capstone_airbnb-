import { combineReducers, configureStore } from "@reduxjs/toolkit";
import locationSlice from "./slices/location.slice";
import loadingSlice from "./slices/loading.slice";
const rootReducer = combineReducers({
  location: locationSlice,
  loading: loadingSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
