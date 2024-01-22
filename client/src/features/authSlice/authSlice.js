import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_URL = 'https://backendrestfullseleccionado.online/api/v1/users'

// creamos un usuario
export const createUser = createAsyncThunk('authUser/register', async (user, thunkAPI) => {
  // const { email, password, firstName,lastName,contact,address } = user
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
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

// traemos todos losusuarios
export const getUsers = createAsyncThunk('authUser/getUsers', async (_, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      const error = await response.json()
      return thunkAPI.rejectWithValue(error)
    }
    // const data = await response.json()
    const data = await response.text()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

//  traemos un usuario por su id
export const getUserById = createAsyncThunk('authUser/getUserById', async (args, thunkAPI) => {
  try {
    // console.log('argumentos -->', args)
    const { token, UserId } = args
    const response = await fetch(`${API_URL}/${UserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export const modifyUser = createAsyncThunk('authUser/modifyUser', async (args, thunkAPI) => {
  const { token, userId, newUserData } = args
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'PATCH',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newUserData)
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

export const deleteUser = createAsyncThunk('authUser/deleteUser', async (args, thunkAPI) => {
  const { token, userId } = args
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      if (response.status === 403) {
        return thunkAPI.rejectWithValue({ status: response.status, message: 'No tienes permisos para realizar esta accion' })
      }
      const error = await response.json()
      return thunkAPI.rejectWithValue(error)
    }
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const authSlice = createSlice({
  name: 'authUser',
  initialState: {
    user: null, // para el login, se debera guardar los datos deluser
    isAuthenticated: false, // para el login
    token: null, // lo que devuelve el servidor, para el login, se debera guardar los datos deluser, por si trae un token o algo asi

    userCreated: [], // para visualizar de momento el create user
    usersList: [],
    userDeleted: false,
    userById: null,
    isLoading: false,
    error: null,
    isAdmin: false,
    update: false
  },
  reducers: {
    successLogin: (state) => {
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
    clearUserById: (state) => {
      state.userById = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.userCreated = action.payload
        state.isAuthenticated = false
        // state.token = action.payload.token //suponiendo que devuelve un token
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.usersList = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.userById = action.payload
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })
      .addCase(modifyUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(modifyUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.update = true
      })
      .addCase(modifyUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.userDeleted = false
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = null
        state.userDeleted = true
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.userDeleted = false
        state.error = action.payload
        if (action.payload.status === 403) {
          state.error = action.payload.message
        } else {
          state.error = 'Ocurrión un error al eliminar el usuario.'
        }
      })
  }
})
export const { successLogin, logout, clearUserById } = authSlice.actions
export default authSlice.reducer
