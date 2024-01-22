import { createSlice } from '@reduxjs/toolkit'

const reputacionSlice = createSlice({
  name: 'reputacion',
  initialState: {
    intercambiosExitosos: 15,
    intercambiosFallidos: 2,
    totalPublicaciones: 32,
    valoracionesPositivas: 15,
    valoracionesNegativas: 2,
    devoluciones: 1,
    arrayValoracionNegativa: [],
    arrayValoracionPositiva: [],
    arrayCancelados: []
  },
  reducers: {
    setIntercambiosExitosos: (state, action) => {
      state.intercambiosExitosos += action.payload
    },
    setIntercambiosFallidos: (state, action) => {
      state.intercambiosFallidos += action.payload
    },
    setTotalPublicaciones: (state, action) => {
      state.totalPublicaciones += action.payload
    },
    setValoracionesPositivas: (state, action) => {
      state.valoracionesPositivas += action.payload.punto
      state.arrayValoracionPositiva.push(action.payload)
    },
    setValoracionesNegativas: (state, action) => {
      state.valoracionesNegativas += action.payload.punto
      state.arrayValoracionNegativa.push(action.payload)
    },
    setDevoluciones: (state, action) => {
      state.devoluciones += action.payload
    },
    setArrayCancelados: (state, action) => {
      state.arrayCancelados.push(action.payload)
    }

  }
})

export const {
  setIntercambiosExitosos,
  setIntercambiosFallidos,
  setTotalPublicaciones,
  setValoracionesPositivas,
  setValoracionesNegativas,
  setDevoluciones
} = reputacionSlice.actions

export default reputacionSlice.reducer
