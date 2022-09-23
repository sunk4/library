import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import libraryApi from '../../common/libraryApi'
import type { RootState } from '../store'

const initialState = {}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: {},
})


export default bookSlice.reducer