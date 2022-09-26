import { configureStore } from '@reduxjs/toolkit'
import libraries from './libraries/librarySlice'
import book from './libraries/bookSlice'
import user from "./libraries/userSlice"

export const store = configureStore({
  reducer: {
    libraries,
    book,
    user
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
