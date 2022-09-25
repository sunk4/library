import { configureStore } from '@reduxjs/toolkit'
import libraries from './libraries/librarySlice'
import books from './libraries/bookSlice'
import user from "./libraries/userSlice"

export const store = configureStore({
  reducer: {
    libraries,
    books,
    user
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
