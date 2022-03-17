import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moodService from './moodService'

const initialState = {
  moods: [],
  text: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const getMoods = createAsyncThunk(
  'moods/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await moodService.getMoods(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// creating moods
export const createMood = createAsyncThunk(
  'moods/create',
  async (moodData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await moodService.createMood(moodData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // Creaeting Mood
      .addCase(createMood.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMood.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.moods.push(action.payload)
        state.text.push(action.payload)
      })
      .addCase(createMood.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //   getting Mood
      .addCase(getMoods.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMoods.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        state.moods = action.payload
      })
      .addCase(getMoods.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.message = action.payload
      })
  },
})

export const { reset } = moodSlice.actions
export default moodSlice.reducer
