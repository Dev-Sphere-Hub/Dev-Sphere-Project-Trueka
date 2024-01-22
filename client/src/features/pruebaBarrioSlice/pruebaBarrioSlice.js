import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const obtenerCoordenadas = createAsyncThunk(
  'ubicacion/obtenerCoordenadas', async (direccion, thunkAPI) => {
    try {
      const encodedDireccion = encodeURIComponent(direccion)
      const url = `https://nominatim.openstreetmap.org/search?q=${encodedDireccion}&format=json`

      const response = await fetch(url)
      const data = await response.json()
      // console.log('data ubicacion -->', data)
      if (data.length > 0) {
        const latitude = data[0].lat
        const longitude = data[0].lon
        return { latitude, longitude }
      } else {
        throw new Error('No se encontrón resultados.')
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getBarrio = createAsyncThunk(
  'barrio/getBarrio', async (ubicacion, thunkAPI) => {
    // console.log('primera ubi', ubicacion)
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${ubicacion.latitude}&lon=${ubicacion.longitude}&format=json`, {
        method: 'GET'
      })
      if (response.ok) {
        const data = await response.json()
        return data.address.road
      } else {
        throw new Error('No se pudo obtener la ubicación.')
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })

export const obtenerCoordenadasUsuario = createAsyncThunk(
  'ubicacion/obtenerCoordenadasUsuario',
  async (_, thunkAPI) => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      return { latitude, longitude }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const barrioSlice = createSlice({
  name: 'barrio',
  initialState: {
    cordenadasUser: {},
    cordenadas: {},
    barrio: null,
    loading: false,
    error: null
  },
  reducers: {
    resetBarrio: (state) => {
      state.barrio = ''
      state.loading = false
      state.error = null
    },
    resetCordenadas: (state) => {
      state.cordenadas = {}
      state.loading = false
      state.error = null
    },
    reseCordenadasUser: (state) => {
      state.cordenadasUser = {}
      state.loading = false
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(obtenerCoordenadas.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(obtenerCoordenadas.fulfilled, (state, action) => {
        state.loading = false
        state.cordenadas = action.payload
      })
      .addCase(obtenerCoordenadas.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getBarrio.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(getBarrio.fulfilled, (state, action) => {
        state.loading = false
        state.barrio = action.payload
      })
      .addCase(getBarrio.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(obtenerCoordenadasUsuario.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(obtenerCoordenadasUsuario.fulfilled, (state, action) => {
        state.loading = false
        state.cordenadasUser = action.payload
      })
      .addCase(obtenerCoordenadasUsuario.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { resetBarrio, resetCordenadas, reseCordenadasUser } = barrioSlice.actions
export default barrioSlice.reducer
