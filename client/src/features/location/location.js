import { createSlice } from '@reduxjs/toolkit'

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    longitude: 0,
    latitude: 0,
    lat: 'F',
    lon: 'F'
  },
  reducers: {
    setLocation: (state, action) => {
      state.longitude = action.payload.longitude
      state.latitude = action.payload.latitude
    },
    setLat: (state, action) => {
      state.lat = action.payload
    },
    setLon: (state, action) => {
      state.lon = action.payload
    }

  }
})

export const { setLocation, setLat, setLon } = locationSlice.actions

export default locationSlice.reducer
