/* eslint-disable react/jsx-indent */
/* eslint-disable no-undef */
import './styles/publication.css'
import 'swiper/css'
import Input from './Input'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getCategoriesById } from '../../features/categoriesSlice/categorySlice'
import { createProduct } from '../../features/productsSlice/productSlice'
import PBCarousel from './PBCarousel'
import { obtenerCoordenadas } from '../../features/pruebaBarrioSlice/pruebaBarrioSlice'
import MapWithSearch from '../MapWithSearch/MapWithSearch'
import AlertPublication from './Alert'

function Publication () {
  const userData = useSelector((state) => state?.autenticacion?.user)
  const userToken = useSelector((state) => state?.autenticacion?.token)
  const [formState, setformState] = useState({
    owner: userData?._id,
    name: '',
    category: '',
    subcategory: '',
    images: [],
    location: '',
    description: '',
    lon: '',
    lat: ''
  })

  const [files, setFiles] = useState([])
  const [postState, setPostState] = useState('')
  const categories = useSelector((state) => state?.categories?.categories)
  const subCategory = useSelector((state) => state?.categories?.category)
  const lat = useSelector((state) => state?.location?.lat)

  const dispatch = useDispatch()
  let formData = new FormData()

  const height = files.length > 0 ? '142px' : '0'
  const opacity = files.length > 0 ? '1' : '0'

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setformState((prevformState) => ({
      ...prevformState,
      [name]: value
    }))
  }

  const hanldeFileChange = (e) => {
    const file = e.target.files
    setFiles([...files, ...file])
    const filesArray = Array.from(file)
    setformState((prevformState) => ({
      ...prevformState,
      images: [...prevformState.images, ...filesArray]
    }))
  }

  const handleAlert = () => {
    if (postState === 'successfull' || postState === 'failed') {
      setPostState('')
      resetValues()
      formData = new FormData()
      localStorage.removeItem('latitude')
      localStorage.removeItem('longitude')
    }

    if (postState === 'wrongData') {
      setPostState('')
    }
  }

  const resetValues = () => {
    setformState({
      owner: userData?._id,
      name: '',
      category: '',
      subcategory: '',
      images: [],
      location: '',
      description: '',
      lon: '',
      lat: ''
    })

    setFiles([])
  }

  const submitForm = (token, form) => {
    dispatch(createProduct({ token, product: form }))
      .then((res) => {
        console.log('res ->', res)
        if (res.type === 'products/create/rejected') {
          setPostState('failed')
        }
        if (res.type === 'products/create/fulfilled') { setPostState('successful') }
      })
      .catch((err) => {
        console.log('err ->', err)
      })
      .finally(() => {
        console.log('--- finalizo ---')
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(postState)

    formData.append('owner', formState.owner)
    formData.append('name', formState.name)
    formData.append('category', formState.category)
    formData.append('subcategory', formState.subcategory)
    files.forEach((image) => formData.append('images', image))
    formData.append('location', formState.location)
    formData.append('description', formState.description)
    formData.append('lon', formState.lon)
    formData.append('lat', formState.lat)

    let logged = false
    formData.forEach((value, key) => {
      // console.log('FORM DATA -->', key, value)
      const allFields = { ...formState, images: [...formState.images] }
      if (!logged) {
        console.log(allFields)
        logged = true
      }
    })

    formState.name !== '' &&
    formState.category !== '' &&
    formState.subcategories !== '' &&
    formState.images.length > 0 &&
    formState.images.length <= 10 &&
    formState.description !== '' &&
    formState.lat !== '' &&
    formState.lon !== '' &&
    formState.lat !== null &&
    formState.lon !== null
      ? submitForm(userToken, formData)
      : setPostState('wrongData')
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    const categoryId = categories.length > 0 && formState.category !== '' ? categories.find((category) => category._id === formState.category)._id : ''
    setTimeout(() => {
      dispatch(getCategoriesById(categoryId))
    }, 10)
  }, [formState.category])

  useEffect(() => {
    const latitude = localStorage.getItem('latitude')
    const longitude = localStorage.getItem('longitude')

    setformState((prevFormState) => ({
      ...prevFormState,
      lon: longitude,
      lat: latitude
    }))
  }, [localStorage.getItem('longitude'), dispatch, lat])

  useEffect(() => {
    localStorage.removeItem('latitude')
    localStorage.removeItem('longitude')
  }, [])

  return (
    <>
      <form className='publication-container' onSubmit={handleSubmit}>
        <div className='title-container'>
          <p>Publicar un artículo</p>
        </div>

        <div className='custom-container'>
          <Input ids='input-bot' placeh='Ej: Bicicleta BMX, rodado 24' type='text' name='name' onInputChange={handleInputChange}>Indicá producto, marca, modelo y características principales</Input>
        </div>

        <div className='custom-container'>
          <Input type='select' name='category' onInputChange={handleInputChange} categories={categories} opcion='categoría'>Seleccioná la categoría que corresponde a tu artículo</Input>
        </div>

        <div className='custom-container'>
          <Input type='select' name='subcategory' onInputChange={handleInputChange} categories={subCategory.subcategories} opcion='subcategoría'>Seleccioná la subcategoría que corresponde a tu artículo</Input>
        </div>

        {/* Funcion de agregar fotos a la publicacion */}

        <div className='custom-container'>
          <div className='title-carousel'>
            <div>
              <p className='input-title'>Cargá las fotos reales de  tu artículo (Hasta 10 fotos)</p>
            </div>

            <div className='carousel-div' style={{ height, opacity }}>
              <PBCarousel data={files} />

            </div>

            <div className='input-container'>
              <label htmlFor='add-image-input' className='label-input'>
                +Cargar fotos
              </label>

              <input
                type='file'
                id='add-image-input'
                multiple
                name='images'
                onChange={hanldeFileChange}
              />
            </div>
          </div>

        </div>

        <div className='custom-container'>

          <h6 className='input-title'>Indicá dónde se encuentra el artículo que querés publicar</h6>
          <MapWithSearch onInputChange={handleInputChange} valueSearch={formState.location} />

        </div>

        <div className='custom-container'>
          <Input
            ids='input-desc' type='text' name='description' placeh='Describí el artículo que estás publicando para intercambiar. Detallá las condiciones en las que se encuentra y si hay cosas que tu contraparte debe saber. Indicá si estás buscando artículos específicos por los que te gustaría intercambiar éste.' onInputChange={handleInputChange}
          >
            Descripción del artículo
          </Input>
        </div>

        <div>
          <button type='submit' className='submit-button-p'>
            Publicar
          </button>
        </div>

      </form>

      {postState === 'successful' || postState === 'wrongData' || postState === 'failed'

        ? (<div className='alerts-container'>
          <AlertPublication status={postState} handleAlert={handleAlert} />
           </div>)
        : ''}

    </>
  )
}

export default Publication
