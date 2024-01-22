import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// dejo armado el slice, asi ya despues solo cambiamos la ruta

const API_URL = 'https://backendrestfullseleccionado.online/api/v1/products'

export const createProduct = createAsyncThunk('products/create', async (args, thunkAPI) => {
  const { token, product } = args
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: product
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

export const getProducts = createAsyncThunk('products/get', async (_, thunkAPI) => {
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

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      if (!response.ok) {
        if (response.status === 404) {
          return thunkAPI.rejectWithValue({ status: response.status, message: 'ID de producto no encontrado.' })
        } else {
          const error = await response.text()
          return thunkAPI.rejectWithValue(error)
          // throw new Error('Algo salio mal')
        }
      }
      const data = await response.json()
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const modifyProductById = createAsyncThunk('products/modify',
  async (args, thunkAPI) => {
    const { token, newProduct, productId } = args
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      })
      if (!response.ok) {
        if (response.status === 404) {
          return thunkAPI.rejectWithValue({ status: response.status, message: 'ID de producto no encontrado.' })
        } else {
          const error = await response.text()
          return thunkAPI.rejectWithValue(error)
          // throw new Error('Algo salio mal')
        }
      }
      const data = await response.json()
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })

export const deleteProductById = createAsyncThunk('products/delete',
  async (args, thunkAPI) => {
    const { token, productId } = args
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) {
        if (response.status === 404) {
          return thunkAPI.rejectWithValue({ status: response.status, message: 'ID de producto no encontrado.' })
        } else if (response.status === 403) {
          return thunkAPI.rejectWithValue({ status: response.status, message: 'No tienes permisos para realizar esta accion.' })
        } else {
          const error = await response.text()
          return thunkAPI.rejectWithValue(error)
          // throw new Error('Algo salio mal')
        }
      }
      const data = await response.json()
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })

export const getProductsByCategoryId = createAsyncThunk('products/getProductsByCategoryId', async (categoryId, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/category/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    if (!response.ok) {
      if (response.status === 404) {
        return thunkAPI.rejectWithValue({ status: response.status, message: 'Productos con id de categoría no encontrados' })
      } else {
        const error = await response.text()
        return thunkAPI.rejectWithValue(error)
        // throw new Error('Algo salio mal')
      }
    }
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getProductsBySubcategoryId = createAsyncThunk('products/getProductsBySubcategoryId', async (subCategoryId, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/subcategories/${subCategoryId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    if (!response.ok) {
      if (response.status === 404) {
        return thunkAPI.rejectWithValue({ status: response.status, message: 'Productos con ID de subcategoría no encontrados' })
      } else {
        const error = await response.text()
        return thunkAPI.rejectWithValue(error)
        // throw new Error('Algo salio mal')
      }
    }
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

// export const addLikeProduct = createAsyncThunk(
//   'products/addLikeProduct',
//   async (product, thunkAPI) => {
//     try {
//       const currentSlice = thunkAPI.getState().productsDb

//       // verifica si  ya esta en la lista el producto
//       const productoIndex = currentSlice.likeProducts.findIndex((likeProduct) => likeProduct._id === product._id)
//       console.log('PRODUCTO INDEX ->', productoIndex)

//       if (productoIndex !== -1) {
//         // si no está en la lista, lo añade
//         return thunkAPI.fulfilled({ status: 201, message: 'Producto eliminado con exito', payload: product })
//       } else {
//         // si está en la lista, lo elimina
//         return thunkAPI.fulfilled({ status: 200, message: 'Producto añadido', payload: product })
//       }
//     } catch (error) {
//       // Manejar errores generales
//       return thunkAPI.rejectWithValue({ status: 404, message: 'algo salio mal' })
//     }
//   }
// )

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productById: false,
    productsByCategory: [],
    productsBySubcategory: [],
    productsByKeyword: [],
    userProducts: [],
    likeProducts: [],
    status: '',
    loading: false,
    error: null,
    searchResults: ''
  },
  reducers: {
    toggleLikeProduct: (state, action) => {
      const product = action.payload
      const index = state.likeProducts.findIndex((likeProduct) => likeProduct._id === product._id)

      if (index !== -1) {
        // Si el producto ya está en la lista, se elimina
        state.likeProducts.splice(index, 1)
      } else {
        // Si el producto no está en la lista, se agrega
        state.likeProducts.push(product)
      }
    },
    addToSearchResults: (state, action) => {
      state.searchResults = true
      state.searchResults = action.payload
    },
    addUserProducts: (state, action) => {
      state.userProducts = []
      state.userProducts = action.payload
    },
    addToproductsByKeyword: (state, action) => {
      state.productsByKeyword = []
      state.productsByKeyword = action.payload
    },
    clearProductById: (state) => {
      state.productById = false
    },
    clearProductsByCategory: (state) => {
      state.productsByCategory = []
    },
    clearProductsBySubcategory: (state) => {
      state.productsBySubcategory = []
    },
    clearProductByKeyword: (state) => {
      state.productsByKeyword = []
    },
    clearAllFilters: (state) => {
      state.productById = []
      state.productsByCategory = []
      state.productsBySubcategory = []
      state.productsByKeyword = []
    }
  },
  extraReducers: (builder) => {
    // manejo acciones asincronas
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading'
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.products.push(action.payload) // lo añadimos a la lista de productos
        state.error = null
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload

        if (action.payload && action.payload.status === 400) {
        // Solicitud incorrecta en los datos del producto
          state.error = action.payload.message
        } else if (action.payload && action.payload.status === 409) {
        // El producto ya existe
          state.error = action.payload.message
        } else {
        // Otro caso de error
          state.error = 'Ocurrió un error al crear el producto.'
        }
      })
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.products = action.payload
        state.error = null
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
      })
      .addCase(getProductById.pending, (state) => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.productById = action.payload
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
        if (action.payload && action.payload.status === 404) {
          state.error = action.payload.message
        } else {
          state.error = 'Ocurrión un error al obtener el producto.'
        }
      })
      .addCase(modifyProductById.pending, (state) => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(modifyProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product)
      })
      .addCase(modifyProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
        if (action.payload && action.payload.status === 404) {
          state.error = action.payload.message
        } else {
          state.error = 'Ocurrión un error al modificar el producto.'
        }
      })
      .addCase(deleteProductById.pending, (state) => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.products = state.products.filter(product => product.id !== action.payload.id)
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
        if (action.payload && action.payload.status === 404) {
          state.error = action.payload.message
        } else if (action.payload && action.payload.status === 403) {
          state.error = action.payload.message
        } else {
          state.error = 'Ocurrión un error al eliminar el producto.'
        }
      })
      .addCase(getProductsByCategoryId.pending, (state) => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(getProductsByCategoryId.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.productsByCategory = action.payload
      })
      .addCase(getProductsByCategoryId.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
        if (action.payload && action.payload.status === 404) {
          state.error = action.payload.message
        } else {
          state.error = 'Ocurrión un error al obtener los productos.'
        }
      })
      .addCase(getProductsBySubcategoryId.pending, (state) => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(getProductsBySubcategoryId.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.productsBySubcategory = action.payload
      })
      .addCase(getProductsBySubcategoryId.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.payload
        if (action.payload && action.payload.status === 404) {
          state.error = action.payload.message
        } else {
          state.error = 'Ocurrión un error al obtener los productos.'
        }
      })
  }
})

export const { toggleLikeProduct, addToSearchResults, addUserProducts, addToproductsByKeyword, clearProductById, clearProductsByCategory, clearProductsBySubcategory, clearProductByKeyword, clearAllFilters } = productSlice.actions
export const selectProducts = (state) => state.product.products
export default productSlice.reducer

/*
Nota:
al haber tantas formas de filtrar creo que lo mas conveniente es hacerlo algo asi:

* en caso de querer filtar todo en el home
if (productByCategory.length > 0 && productsBySubcategory.length === 0 && productById.length === 0 &&  productsByKeyword.length === 0 ) {
    Mostrar los productos filtrados por categoría
  } else if (productById.length > 0 &&  productByCategory.length === 0 && productsBySubcategory.length === 0 &&  productsByKeyword.length === 0 ){
    Mostrar los productos filtrados por ID
  }
  else if ( productsByKeyword.length > 0 && productById.length === 0 &&  productByCategory.length === 0 && productsBySubcategory.length === 0 ){
    Mostrar los productos filtrados por palabra clave
  }
  else {
    mostramos todos los productos
  }

  * la otra es añadir rutas para cada filtrado, quizas sea lo mejor opcion
  /  => filtra todos
  /filtroId  => filtrara por id
  /filtroCategoryId => filtra por id de la categoria
  /filtroSubcategoryId => filtra por id de la subcategoria
  /filtroKeyword => filtra por palabra clave

*/
