import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import libraryApi from '../../common/libraryApi'
import type { RootState } from '../store'

interface Library {
  _id: string
  libraryName: string
  address: string
  phoneNumber: string
  books: string[]
}

interface LibrariesSliceState {
  libraries: Library[]
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
  async (data: any) => {
    const { libraryName, address, phoneNumber } = data
     
    const response = await libraryApi.post('/library', {
      libraryName,
      address,
      phoneNumber,
    })
    return response.data
  }
)

const initialState: LibrariesSliceState = {
  libraries: [],
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
      console.log(state.libraries);      
      console.log(action.payload);
      
      state.libraries = [...state.libraries, action.payload] 
    })
  },
})

export const {} = librarySlice.actions

export const selectAllLibraries = (state: RootState) =>
  state.libraries.libraries

export default librarySlice.reducer
