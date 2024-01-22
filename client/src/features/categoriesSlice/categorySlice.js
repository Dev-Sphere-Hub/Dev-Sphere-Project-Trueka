import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_URL = 'https://backendrestfullseleccionado.online/api/v1/categories'

export const createCategories = createAsyncThunk('categories/post', async (args, thunkAPI) => {
  const { token, category } = args
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    })
    if (!response.ok) {
      const error = await response.text()
      return thunkAPI.rejectWithValue(error)
      // throw new Error('Algo salio mal')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getCategories = createAsyncThunk('categories/get', async (_, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      const error = await response.text()
      return thunkAPI.rejectWithValue(error)
      // throw new Error('Algo salio mal')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getCategoriesById = createAsyncThunk('categories/getByid', async (id, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      const error = await response.text()
      return thunkAPI.rejectWithValue(error)
      // throw new Error('Algo salio mal')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const modifyCategoryById = createAsyncThunk('categories/modify', async (args, thunkAPI) => {
  const { token, categoryId, newCategory } = args
  try {
    const response = await fetch(`${API_URL}/${categoryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newCategory)
    })
    if (!response.ok) {
      const error = await response.text()
      return thunkAPI.rejectWithValue(error)
      // throw new Error('Algo salio mal')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteCategoryById = createAsyncThunk('categories/delete', async (args, thunkAPI) => {
  const { token, categoryId } = args
  try {
    const response = await fetch(`${API_URL}/${categoryId}`, {
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
      const error = await response.text()
      return thunkAPI.rejectWithValue(error)
      // throw new Error('Algo salio mal')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    category: [],
    isDeleted: false,
    isModified: false,
    isCreated: false,
    loading: false,
    error: null
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // manejo accion createCategories
      .addCase(createCategories.pending, (state) => {
        state.loading = true
        state.error = null
        state.isCreated = false
      })
      .addCase(createCategories.fulfilled, (state, action) => {
        state.loading = false
        state.isCreated = true
        state.categories.push(action.payload)
      })
      .addCase(createCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isCreated = false
      })

      // manejo accion getCategories
      .addCase(getCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // manejo accion getCategoriesById
      .addCase(getCategoriesById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCategoriesById.fulfilled, (state, action) => {
        state.loading = false
        state.category = action.payload
      })
      .addCase(getCategoriesById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // manejo accion modifyCategoryById
      .addCase(modifyCategoryById.pending, (state) => {
        state.loading = true
        state.error = null
        state.isModified = false
      })
      .addCase(modifyCategoryById.fulfilled, (state, action) => {
        state.loading = false
        state.isModified = true
        state.categories = state.categories.map(category => category.id === action.payload.id ? action.payload : category)
      })
      .addCase(modifyCategoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isModified = false
      })

      // manejo accion deleteCategoryById
      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true
        state.error = null
        state.isDeleted = false
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.loading = false
        state.isDeleted = true
        state.categories = state.categories.filter(category => category.id !== action.payload.id)
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isDeleted = false
      })
  }
})

// export const { reducers } = categorySlice.actions
export const selectCategories = (state) => state.categories.categories
export default categorySlice.reducer
