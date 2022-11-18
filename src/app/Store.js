import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsAPI } from "../services/productsAPI";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { userSlice } from "../services/userSlice"
export const Store = configureStore({
    reducer: {
        [productsAPI.reducerPath]: productsAPI.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsAPI.middleware)
})
setupListeners(Store.dispatch);