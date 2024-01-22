import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_URL = 'https://backendrestfullseleccionado.online/api/v1/subcategories'

export const createSubcategories = createAsyncThunk('subcategories/post', async (args, thunkAPI) => {
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

export const getSubcategories = createAsyncThunk('subcategories/get', async (_, thunkAPI) => {
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

export const getSubcategoriesById = createAsyncThunk('subcategories/getByid', async (id, thunkAPI) => {
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

export const modifySubategoryById = createAsyncThunk('subcategories/modify', async (args, thunkAPI) => {
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

export const deleteSubcategoryById = createAsyncThunk('subcategories/delete', async (args, thunkAPI) => {
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

const subcategoriesSlice = createSlice({
  name: 'subcategories',
  initialState: {
    subcategories: [],
    subcategory: [],
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
      .addCase(createSubcategories.pending, (state) => {
        state.loading = true
        state.error = null
        state.isCreated = false
      })
      .addCase(createSubcategories.fulfilled, (state, action) => {
        state.loading = false
        state.isCreated = true
        state.subcategories.push(action.payload)
      })
      .addCase(createSubcategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isCreated = false
      })

      // manejo accion getCategories
      .addCase(getSubcategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getSubcategories.fulfilled, (state, action) => {
        state.loading = false
        state.subcategories = action.payload
      })
      .addCase(getSubcategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // manejo accion getCategoriesById
      .addCase(getSubcategoriesById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getSubcategoriesById.fulfilled, (state, action) => {
        state.loading = false
        state.subcategory = action.payload
      })
      .addCase(getSubcategoriesById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // manejo accion modifyCategoryById
      .addCase(modifySubategoryById.pending, (state) => {
        state.loading = true
        state.error = null
        state.isModified = false
      })
      .addCase(modifySubategoryById.fulfilled, (state, action) => {
        state.loading = false
        state.isModified = true
        state.categories = state.categories.map(category => category.id === action.payload.id ? action.payload : category)
      })
      .addCase(modifySubategoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isModified = false
      })

      // manejo accion deleteCategoryById
      .addCase(deleteSubcategoryById.pending, (state) => {
        state.loading = true
        state.error = null
        state.isDeleted = false
      })
      .addCase(deleteSubcategoryById.fulfilled, (state, action) => {
        state.loading = false
        state.isDeleted = true
        state.categories = state.categories.filter(category => category.id !== action.payload.id)
      })
      .addCase(deleteSubcategoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isDeleted = false
      })
  }
})

// export const { reducers } = categorySlice.actions
export const selectSubcategories = (state) => state.subcategories.subcategories
export default subcategoriesSlice.reducer
