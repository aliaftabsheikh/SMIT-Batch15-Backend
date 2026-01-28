import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todoSlice'
import { productApi } from '../services/products'
export const store = configureStore({
  reducer: {
    todos: todoReducer,

    [productApi.reducerPath]: productApi.reducer,

    
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
})