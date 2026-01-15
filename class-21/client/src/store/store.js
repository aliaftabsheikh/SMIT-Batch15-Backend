import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todoSlice.js'
import { productApi } from '../services/product.js'

export const store = configureStore({
  reducer: {
    todos : todoReducer,

    [productApi.reducerPath]: productApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
})