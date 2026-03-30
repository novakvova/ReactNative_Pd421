import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {categoryApi} from "@/store/apis/categoryApi";
import {authApi} from "@/store/apis/authApi";

export const store = configureStore({
    reducer: {
        [categoryApi.reducerPath]: categoryApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(categoryApi.middleware)
            .concat(authApi.middleware),
})

setupListeners(store.dispatch)