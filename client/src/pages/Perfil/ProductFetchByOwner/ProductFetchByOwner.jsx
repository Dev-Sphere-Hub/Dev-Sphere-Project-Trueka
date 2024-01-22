import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUserProducts, getProducts } from '../../../features/productsSlice/productSlice'

const ProductFetchByOwner = ({ filtroPor }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
      .then((resp) => {
        const final = resp.payload.filter(producto => producto.owner === filtroPor)
        // console.log('traemos unsando get -> ', resp.payload)
        // console.log('traemos filtrado por usuario -> ', final)
        dispatch(addUserProducts(final))
      })
  }, [dispatch, filtroPor])

  return null
}

export default ProductFetchByOwner
