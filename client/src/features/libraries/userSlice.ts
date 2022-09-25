import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import libraryApi from '../../common/libraryApi'
import type { RootState } from '../store'

export const getSingleUserAsync = createAsyncThunk(
  'user/getSingleUserAsync',
  async (studentId: string | undefined) => {
    const response = await libraryApi.get(`/user/${studentId}`)
    return response.data
  }
)

interface User {
  _id: string
  firstName: string
  lastName: string
}

interface UserSliceState {
  user: User
}

const initialState: UserSliceState = {
  user: { _id: '', firstName: '', lastName: '' },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
 
    builder.addCase(getSingleUserAsync.fulfilled, (state, action) => {  
    
      
      state.user = action.payload[0]
    })
  },
})

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer
