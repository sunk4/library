import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import libraryApi from '../../common/libraryApi'
import type { RootState } from '../store'

interface Libraries {
  _id: string
  libraryName: string
  address: string
  phoneNumber: string
  books: string[]
}

type Library = {
  _id?: string
  libraryName?: string
  address?: string
  phoneNumber?: string
  books?: any
  users?: User[]
}

interface User {
  _id: string
  firstName: string
  lastName: string
}

interface LibrariesSliceState {
  libraries: Libraries[]
  library: Library
}

interface InputLibraryCreate {
  libraryName: string
  address: string
  phoneNumber: string
}

interface InputLibraryUpdate {
  _id: string
  libraryName: string
  address: string
  phoneNumber: string
}

export const getAllLibrariesAsync = createAsyncThunk(
  'libraries/getAllLibrariesAsync',
  async () => {
    const response = await libraryApi.get('/library')

    return response.data
  }
)

export const createLibraryAsync = createAsyncThunk(
  'libraries/createLibraryAsync',
  async (data: InputLibraryCreate) => {
    const { libraryName, address, phoneNumber } = data

    const response = await libraryApi.post('/library', {
      libraryName,
      address,
      phoneNumber,
    })
    return response.data
  }
)

export const deleteLibraryAsync = createAsyncThunk(
  'libraries/deleteLibraryAsync',
  async (id: string) => {
    const response = await libraryApi.delete(`library/${id}`)
    return response.data
  }
)

export const updateLibraryAsync = createAsyncThunk(
  'libraries/updateLibraryAsync',
  async (data: InputLibraryUpdate) => {
    const { _id, libraryName, address, phoneNumber } = data
    const response = await libraryApi.patch(`library/${_id}`, {
      libraryName,
      address,
      phoneNumber,
    })
    return response.data
  }
)

export const getSingleLibraryAsync = createAsyncThunk(
  'libraries/getSingleLibraryAsync',
  async (id: string | undefined) => {
    const response = await libraryApi.get(`library/${id}`)
    return response.data
  }
)

type InputBookCreate = {
  bookName: string
  description: string
  libraryId?: string
}

export const createBookAndItToLibraryAsync = createAsyncThunk(
  'libraries/createBookAndItToLibraryAsync',
  async (data: InputBookCreate) => {
    const { bookName, description, libraryId } = data

    const response = await libraryApi.post(`/book/book/${libraryId}`, {
      bookName,
      description,
    })
    return response.data
  }
)

export const deleteBookFromLibrary = createAsyncThunk(
  'libraries/deleteBookFromLibrary',
  async (_id: string) => {
    const response = await libraryApi.delete(`/book/${_id}`)
    return response.data
  }
)

export const deleteStudentFromLibraryAsync = createAsyncThunk(
  'libraries/deleteStudentFromLibraryAsync',
  async (_id: string) => {
    const response = await libraryApi.delete(`/user/${_id}`)
    return response.data
  }
)

type InputUserCreate = {
  firstName: string
  lastName: string
  libraryId?: string
}

export const createStudentAndAddHimToLibraryAsync = createAsyncThunk(
  'libraries/createStudentAndAddHimToLibraryAsync',
  async (data: InputUserCreate) => {
    const { firstName, lastName, libraryId } = data

    const response = await libraryApi.post(`/user/user/${libraryId}`, {
      firstName,
      lastName,
    })
    return response.data
  }
)

const initialState: LibrariesSliceState = {
  libraries: [],
  library: {},
}

const librarySlice = createSlice({
  name: 'libraries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLibrariesAsync.fulfilled, (state, action) => {
      state.libraries = action.payload
    })
    builder.addCase(createLibraryAsync.fulfilled, (state, action) => {
      state.libraries = [...state.libraries, action.payload]
    })
    builder.addCase(deleteLibraryAsync.fulfilled, (state, action) => {
      const { _id } = action.payload
      const newLibraries = state.libraries.filter(
        (library) => library._id !== _id
      )
      state.libraries = newLibraries
    })
    builder.addCase(updateLibraryAsync.fulfilled, (state, action) => {
      state.library = action.payload
    })
    builder.addCase(getSingleLibraryAsync.fulfilled, (state, action) => {
      state.library = action.payload
    })
    builder.addCase(
      createBookAndItToLibraryAsync.fulfilled,
      (state, action) => {
        state.library.books = [...(state.library.books ?? []), action.payload]
      }
    )
    builder.addCase(deleteBookFromLibrary.fulfilled, (state, action) => {
      const newBooksInLibrary = state.library.books?.filter(
        (book: any) => book._id !== action.payload
      )
      state.library.books = newBooksInLibrary
    })

    builder.addCase(
      deleteStudentFromLibraryAsync.fulfilled,
      (state, action) => {
        const { id } = action.payload

        const newStudentsInLibrary = state.library.users?.filter(
          (user) => user._id !== id
        )
        state.library.users = newStudentsInLibrary
      }
    )
    builder.addCase(
      createStudentAndAddHimToLibraryAsync.fulfilled,
      (state, action) => {
        state.library.users = [...(state.library.users ?? []), action.payload]
      }
    )
  },
})

export const selectAllLibraries = (state: RootState) =>
  state.libraries.libraries

export const selectLibrary = (state: RootState) => state.libraries.library

export default librarySlice.reducer
