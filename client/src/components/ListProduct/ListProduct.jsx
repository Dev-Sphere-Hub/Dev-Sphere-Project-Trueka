import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { getProducts } from '../features/products/fetchProducts'
import ProductsCard from './ProductsCard'
import { Grid } from '@mui/material'

const ListProduct = () => {
  const products = useSelector((state) => state?.products?.products)
  const loading = useSelector((state) => state?.products?.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <Grid container spacing={2}>
      {
      loading
        ? <Loading />
        : products.map((element) => <ProductsCard key={element.id} producto={products} />)
    }
    </Grid>
  )
}

export default ListProduct
