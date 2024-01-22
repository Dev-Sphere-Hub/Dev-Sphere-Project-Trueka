import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_URL = 'https://backendrestfullseleccionado.online/api/v1'

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (_, thunkAPI) => {
  try {
    // redirigimos a google login
    // window.open(`${API_URL}/google`, '_blank')
    window.location.href = `${API_URL}/google`
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

// procesa la respuesta una vez inicia sesion
export const processGoogleCallback = createAsyncThunk('auth/processGoogleCallback', async ({ code, scope, authuser, prompt }, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/auth/google/callback?code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`, {
      method: 'GET'
    })
    if (!response.ok) {
      const error = await response.json()
      return thunkAPI.rejectWithValue(error)
    }
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

// cerrar sesion
export const logout = createAsyncThunk('auth/logout', async (token, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      const error = await response.json()
      return thunkAPI.rejectWithValue(error)
    }
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async (obj, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })

      if (!response.ok) {
        const error = await response.json()
        return thunkAPI.rejectWithValue(error)
      }

      const data = await response.json()
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const DEFAULTSTATE = {
  user: null,
  loading: false,
  error: null,
  token: null,
  isAuthenticated: false,
  isLoggedIn: false,
  isAdmin: false
}

const user = (() => {
  const persisteState = localStorage.getItem('autentication_storage')
  if (persisteState) {
    return JSON.parse(persisteState).user
  }
  return DEFAULTSTATE.user
})()

const initialState = {
  user,
  loading: false,
  error: null,
  token: null,
  isAuthenticated: false,
  isLoggedIn: false,
  isAdmin: false
}

const AutenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    storeAccessToken: (state, action) => {
      state.token = action.payload
    },
    logoutUser: (state) => {
      state.user = null
      state.error = null
      state.isAuthenticated = false
      state.isLoggedIn = false
      state.token = null
      state.isAdmin = false
    }
  },
  extraReducers: (builder) => {
    builder
      // para iniciar sesion
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        // state.isAuthenticated = true
        // state.isLoggedIn = true
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // para procesar la respuesta de google
      .addCase(processGoogleCallback.pending, (state) => {
        state.loading = true
      })
      .addCase(processGoogleCallback.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(processGoogleCallback.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // para cerrar sesion
      .addCase(logout.pending, (state) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.isLoggedIn = false
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = true
        state.isLoggedIn = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { storeAccessToken, logoutUser } = AutenticationSlice.actions
export default AutenticationSlice.reducer
