import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_URL = 'https://backendrestfullseleccionado.online/api/v1/offers'

export const createOffer = createAsyncThunk('offers/create', async (args, thunkAPI) => {
  const { token, offer } = args
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(offer)
    })

    if (!response.ok) {
      const error = await response.text()
      console.log(error)
      return thunkAPI.rejectWithValue(error)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const getAllOffers = createAsyncThunk('offers/getAll', async (token, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = await response.text()
      return thunkAPI.rejectWithValue(error)
    }

    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getOfferById = createAsyncThunk('offers/getOfferById', async (args, thunkAPI) => {
  const { token, id } = args
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = await response.text()
      return thunkAPI.rejectWithValue(error)
    }

    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const changeOfferStatus = createAsyncThunk('offers/changeOfferStatus', async (args, thunkAPI) => {
  const { token, id, status } = args
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(status)
    })

    if (!response.ok) {
      const error = await response.text()
      return thunkAPI.rejectWithValue(error)
    }

    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteOfferById = createAsyncThunk('offers/deleteOfferById', async (args, thunkAPI) => {
  const { id, token } = args
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = await response.text()
      return thunkAPI.rejectWithValue(error)
    }

    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const offerSlice = createSlice({
  name: 'offers',
  initialState: {
    status: '',
    loading: false,
    error: null,
    offerById: '',
    allOffers: ''
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createOffer.pending, (state) => {
        state.status = 'loading'
        state.loading = true
        state.error = null
      })

      .addCase(createOffer.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        // state.allOffers.push(action.payload)
        state.error = null
      })

      .addCase(createOffer.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
      })

      .addCase(getAllOffers.pending, (state) => {
        state.status = 'loading'
        state.loading = true
        state.error = null
      })

      .addCase(getAllOffers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.allOffers = action.payload
        state.error = null
      })

      .addCase(getAllOffers.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
      })

      .addCase(getOfferById.pending, (state) => {
        state.status = 'loading'
        state.loading = true
        state.error = null
      })

      .addCase(getOfferById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.offerById = action.payload
        state.error = null
      })

      .addCase(getOfferById.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
      })

      .addCase(changeOfferStatus.pending, (state) => {
        state.status = 'loading'
        state.loading = true
        state.error = null
      })

      .addCase(changeOfferStatus.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.error = null
      })

      .addCase(changeOfferStatus.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteOfferById.pending, (state) => {
        state.status = 'loading'
        state.loading = true
        state.error = null
      })

      .addCase(deleteOfferById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.error = null
      })

      .addCase(deleteOfferById.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
      })
  }
})

export default offerSlice.reducer
