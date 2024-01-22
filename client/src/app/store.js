import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice/authSlice'
import categoriesReducer from '../features/categoriesSlice/categorySlice'
import productReducer from '../features/productsSlice/productSlice'
import locationReducer from '../features/location/location'
import subcategoriesReducer from '../features/subCategoriesSlice/subcategoriesSlice'
import barrioReducer from '../features/pruebaBarrioSlice/pruebaBarrioSlice'
import autenticacionReducer from '../features/AutenticationSlice/AutenticationSlice'
import offerReducer from '../features/offers/offerSlice'
import reputatacionReducer from '../features/reputacionSlice/reputacionSlice'
import persistLocalStorageMiddleware from './persistLocalStorageMiddleware'

export const store = configureStore({
  reducer: {
    authUser: authReducer,
    productsDb: productReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    barrio: barrioReducer,
    autenticacion: autenticacionReducer,
    location: locationReducer,
    offer: offerReducer,
    reputacion: reputatacionReducer
  },
  middleware: [...getDefaultMiddleware(), persistLocalStorageMiddleware]

})
