import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Form } from 'react-bootstrap'
import './categoryTest.css'
import { getCategories } from '../../features/categoriesSlice/categorySlice'
import { getProductsByCategoryId } from '../../features/productsSlice/productSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CategoryTest = () => {
  const categories = useSelector((state) => state?.categories?.categories)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [categori, setCategori] = useState()

  const handleChange = (event) => {
    setCategori(event.target.value)
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    console.log(categori)
    if (categori !== '' && categori !== undefined) {
      dispatch(getProductsByCategoryId(categori))
        .then((response) => {
          console.log('productos por categoria', response)
          if (response.payload.length > 0) {
            toast.success('redirigiendo')
            setTimeout(() => {
              navigate('/categoria', { state: { categori } })
            }, 3000)
          } else {
            toast.info('No existen productos con esa categoria !!!')
          }
        })
    } else {
      // console.log('no hay categoria')
    }
  }, [categori])

  return (
    <section className='h-100 d-flex justify-content-center align-items-center' style={{ background: 'tomato' }}>
      <div className='contenedorPrincipal d-flex justify-content-center align-items-center flex-column contiene-categorias' style={{ width: '120px', height: '40px', position: 'relative' }}>
        {/* <h2>Categorias</h2> */}
        <Form.Select
          className='formSelect rounded-0 fw-bold position-relative w-110 h-100 border-0 text-ligh'
          style={{
            fontSize: '16px',
            background: 'var(--background-naClaro)'
          }}
          id='categorySelect'
          value={categori}
          onChange={handleChange}
        >

          <option value='' className='form-select'>Categorias</option>
          {
          categories.map((obj) =>
            (
              <option key={uuidv4()} value={obj._id}>{obj.name}</option>
            )
          )
          }
        </Form.Select>
        {/* <div className='iconoCategory '>
          <ion-icon name='chevron-down-sharp' />
        </div> */}
      </div>
    </section>
  )
}

export default CategoryTest
