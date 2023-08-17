import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { globalSlice } from "../slices";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
