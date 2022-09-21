import { configureStore } from '@reduxjs/toolkit'
import libraries from "./libraries/librarySlice"


export const store = configureStore({
  reducer: {
    libraries
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch