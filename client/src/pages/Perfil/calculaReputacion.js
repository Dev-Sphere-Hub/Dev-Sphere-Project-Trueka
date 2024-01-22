export const calcularReputacion = (objeto) => {
  const { intercambiosExitosos, valoracionesPositivas, valoracionesNegativas, devoluciones } = objeto

  const pesoIntercambiosExitosos = 0.3
  const pesoValoracionesPositivas = 0.3
  const pesoValoracionesNegativas = 0.3
  const pesoDevoluciones = 0.1

  const reputacion = (intercambiosExitosos * pesoIntercambiosExitosos) +
    (valoracionesPositivas * pesoValoracionesPositivas) -
    (valoracionesNegativas * pesoValoracionesNegativas) -
    (devoluciones * pesoDevoluciones)

  return reputacion
}
