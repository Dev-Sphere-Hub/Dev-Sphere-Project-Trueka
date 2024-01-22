/* eslint-disable react/jsx-indent */
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchProductById, getProducts } from '../features/products/fetchProducts'
import './Ofertar.css'
import CardProduct from '../components/CardProduct'
import { getProductById, getProducts } from '../features/productsSlice/productSlice'
import { clearUserById, getUserById } from '../features/authSlice/authSlice'
import { toast } from 'react-toastify'
import { createOffer } from '../features/offers/offerSlice'

const Ofertar = () => {
  const product = useSelector((state) => state?.productsDb?.productById)
  const userProducts = useSelector((state) => state.authUser?.userById?.products)
  const userOn = useSelector((state) => state.authUser?.userById)
  const token = localStorage.getItem('token')

  const dispatch = useDispatch()
  const { id, userID } = useParams()
  const navigate = useNavigate()

  const [formState, setFormState] = useState({
    status: 'pending',
    offerOwnerId: userID,
    offerTargetItem: id,
    offeredItems: []
  })

  const [shownToast, setShownToast] = useState(false)

  const cardSelect = (id) => {
    if (formState.offeredItems?.includes(id)) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        offeredItems: prevFormState.offeredItems.filter((cardId) => cardId !== id)
      }))
    } else {
      setFormState((prevFormState) => ({
        ...prevFormState,
        offeredItems: [...prevFormState.offeredItems, id]
      }))
    }
  }

  const resetForm = () => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      offeredItems: []
    }))
  }

  const dispatchForm = (form, token) => {
    dispatch(createOffer({ token, offer: form }))
      .then((res) => {
        toast.success('oferta enviada correctamente')
        navigate(`/detalle/${id}/${product?.owner}`)
        resetForm()
      })
  }

  const submitHandler = () => {
    const formData = new FormData()
    const offeredArray = JSON.stringify(formState.offeredItems)
    formData.append('status', formState.status)
    formData.append('offerOwnerId', formState.offerOwnerId)
    formData.append('offerTargetItem', formState.id)
    formData.append('offeredItems', offeredArray)

    if (formState.offeredItems.length > 0) {
      dispatchForm(formState, token)
    }
  }

  useEffect(() => {
    if (userID === product?.owner && !shownToast) {
      toast.error('No podes ofertar a tu propia publicación', { toastId: 'custom-toast', autoClose: 2500 })
      setShownToast(true)
      navigate('/')
      setShownToast(false)
    }
    dispatch(clearUserById())
  }, [])

  useEffect(() => {
    dispatch(getProductById(id))
    dispatch(getProducts())
    if (userID !== '64aba27c2415d442b78559c1') {
      dispatch(getUserById({ token, UserId: userID }))
    }
  }, [dispatch])

  return (
    <div>
      <h3 className='titulo-detalle'>{product?.name}</h3>
      <div className='imagen-descripcion'>
        <div className='contenedor-imagen'>
          <img src={product?.images} alt='' className='imagen-producto' />
        </div>
      </div>

      <hr />

      <div className='articulo-ofrecer'>
        <h3>¿Qué artículo/s querés ofrecer por este?</h3>
      </div>

      <div className='ver-todos'>
        <Link><h6>Ver todos.</h6></Link>
      </div>

    {userOn?._id === userID
      ? (
    <div className='acomodar'>
        {userProducts?.map((prod, i) =>
          (
          <div key={prod?._id} className='offer-card-container' id='offer-card-container'>
          <label htmlFor={`productCard${i}`}>
          <div
            onClick={() => cardSelect(prod._id)}
            className='div-card'
          >
            <CardProduct props={[prod]} />
          </div>
          </label>

          <div className='checkbox-card'>
            <input type='checkbox' name='cardSelected' id={`productCard${i}`} />
          </div>

          </div>

          ))}
    </div>)
      : ''}

      <div className='boton'>
        <button className='ofertar' product={product} onClick={() => { submitHandler() }}>Confirmar Oferta</button>

      </div>
      <div className='publica'>
        <Link to='/publicacion'><p>+ Publicar otro articulo.</p></Link>

      </div>

    </div>
  )
}

export default Ofertar
