import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import libraryApi from '../../common/libraryApi'
import type { RootState } from '../store'

export const getSingleBookAsync = createAsyncThunk(
  'book/getSingleUserAsync',
  async (bookId: string | undefined) => {
    const response = await libraryApi.get(`/book/${bookId}`)
    return response.data
  }
)

interface InputEditBook {
  _id: string
  bookName: string
  description: string
}

export const editSingleBookAsync = createAsyncThunk(
  'user/editSingleBookAsync',
  async (data: InputEditBook) => {
    const { _id, bookName, description } = data
    const response = await libraryApi.patch(`/book/${_id}`, {
      bookName,
      description,
    })
    return response.data
  }
)

interface User {
  firstName: string
  lastName: string
}

interface Book {
  _id: string
  bookName: string
  description: string
  amount: number
  user: User
}

interface BookSliceState {
  book: Book
}

const initialState: BookSliceState = {
  book: {
    _id: '',
    bookName: '',
    description: '',
    amount: 0,
    user: { firstName: '', lastName: '' },
  },
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleBookAsync.fulfilled, (state, action) => {
      state.book = action.payload
    })
    builder.addCase(editSingleBookAsync.fulfilled, (state, action) => {
      state.book = action.payload
    })
  },
})

export const selectBook = (state: RootState) => state.book.book

export default bookSlice.reducer
