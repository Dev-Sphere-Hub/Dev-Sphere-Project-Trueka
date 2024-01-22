import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap/'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../features/categoriesSlice/categorySlice'
import { getSubcategories } from '../../features/subCategoriesSlice/subcategoriesSlice'
import { getUsers } from '../../features/authSlice/authSlice'
import { createProduct } from '../../features/productsSlice/productSlice'
// import { v4 as uuidv4 } from 'uuid'

const FormCargaProducts = () => {
  // const usuarios = useSelector((state) => state?.authUser?.usersList)

  const usuarios = [
    {
      id: '64aba27c2415d442b78559c1',
      email: 'guillermoneculqueo@gmail.com',
      password: '@Guille123',
      firstName: 'guillermo agustin',
      lastName: 'neculqueo',
      contact: '2944396887',
      address: 'argentina, rio negro, ingeniero jcobacci'
    }]
  const categorias = useSelector((state) => state?.categories?.categories)
  const subcategoriasList = useSelector((state) => state?.subcategories?.subcategories)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const [owner, setOwner] = React.useState('')
  const [category, setCategory] = useState('')
  const [subcategories, setSubcategories] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    // const fileURLs = []
    switch (name) {
      case 'name':
        setName(value)
        break
      case 'description':
        setDescription(value)
        break
      case 'owner':
        setOwner(value)
        break
      case 'category':
        setCategory(value)
        break
      case 'subcategories':
        // setSubcategories(value)
        setSubcategories(value)
        break
      default:
        break
    }
  }

  const handleChangeFile = (e) => {
    console.log(e)

    const files = e.target.files
    const selectedImages = Array.from(files).map((file) => file)
    setImages(selectedImages)
    // const selectedImages = Array.from(files).map((file) => file.name)

    // setImages(selectedImages)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('owner', owner)
    formData.append('category', category)
    formData.append('subcategory', subcategories)
    images.forEach((image) => formData.append('images', image))
    formData.append('lon', '-69.5439412')
    formData.append('lat', '-69.5439412')

    formData.forEach((value, key) => {
      console.log('FORM DATA -->', key, value)
    })
    //

    // const newProduct = {
    //   name,
    //   description,
    //   price: Number(price),
    //   images,
    //   owner,
    //   category,
    //   subcategories,
    //   long: ubicacion.longitude.toString(),
    //   lat: ubicacion.latitude.toString()
    // }

    // restart errors
    setErrors({})

    // validate basicos, despues se puede añadir expreciones regulares
    const errors = {}
    if (!name) {
      errors.name = 'El campo nombre es requerido'
    }
    if (!description) {
      errors.description = 'El campo descripcion es requerido'
    }
    if (images.length === 0) {
      errors.images = 'El campo imagenes es requerido'
    }
    if (!owner) {
      errors.owner = 'El campo propietario es requerido'
    }
    if (!category) {
      errors.category = 'El campo categoria es requerido'
    }
    if (!subcategories) {
      errors.subcategories = 'El campo subcategorias es requerido'
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
    } else if (Object.keys(errors).length === 0) {
      // console.log('no hay errores')
      // console.log('NewProduct ->', formData)

      dispatch(createProduct(formData))
        .then((res) => {
          console.log('res ->', res)
          resetStates()
        })
        .catch((err) => {
          console.log('err ->', err)
        })
        .finally(() => {
          console.log('--- finalizo ---')
        })
    }
  }

  const resetStates = () => {
    setName('')
    setDescription('')
    setCategory('')
    setSubcategories('')
    setImages([])
    setOwner('')
  }

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getSubcategories())
    dispatch(getUsers())
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  }, [dispatch])

  return (
    <div className='container'>
      <h1>Formulario de carga de productos</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formGroupName'>
          <Form.Label>nombre</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nombre producto'
            name='name'
            value={name}
            onChange={handleChange}
          />
          {errors.name && <Form.Text className='text-danger'>{errors.name}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formGroupDescription'>
          <Form.Label>descripcion</Form.Label>
          <Form.Control
            type='text'
            placeholder='Descripcion producto'
            name='description'
            value={description}
            onChange={handleChange}
          />
          {errors.description && <Form.Text className='text-danger'>{errors.description}</Form.Text>}
        </Form.Group>

        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Suba imágenes</Form.Label>
          <Form.Control
            type='file'
            multiple
            name='images'
            onChange={handleChangeFile}
          />
          <div style={{ with: '100%', height: '100px', border: '1px solid #ccc', overflow: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            {images.length > 0 &&
            images.map((image, index) => (
              <div key={index} style={{ width: '80px', aspectRatio: '1/1', backgroundColor: '#ccc', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '5px' }} src={URL.createObjectURL(image)} alt={`Imagen ${index + 1}`} />
              </div>
            ))}
            {errors.images && <Form.Text className='text-danger'>{errors.images}</Form.Text>}
          </div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formGroupimage'>
          <Form.Select
            aria-label='select dueño'
            value={owner}
            name='owner'
            onChange={handleChange}
          >
            <option>Seleccione dueño</option>
            {
            usuarios.map((usuario) => (
              <option value={usuario.id} key={usuario.id}>
                {usuario.id}
              </option>
            ))
            }
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formGroupimage'>
          <Form.Select
            aria-label='select category'
            value={category}
            name='category'
            onChange={handleChange}
          >
            <option>Seleccione categoria </option>
            {
            categorias.map((categoria) => (
              <option value={categoria._id} key={categoria._id}>
                {categoria.name}
                {/* {console.log(categoria)} */}
              </option>
            ))
            }
          </Form.Select>
        </Form.Group>
        {
        category !== ''
          ? (
            <Form.Group className='mb-3' controlId='formGroupimage'>
              <Form.Select
                aria-label='select subcategory'
                value={subcategories}
                name='subcategories'
                onChange={handleChange}
              >
                <option>Seleccione subcategoria</option>
                {
            subcategoriasList
              .filter(subcategoria => subcategoria.category === category)
              .map((subcategoria) => (
                <option value={subcategoria._id} key={subcategoria._id}>
                  {subcategoria.name}
                </option>
              ))
            }
              </Form.Select>
            </Form.Group>
            )
          : null
        }

        <Button type='submit'>Submit form</Button>

      </Form>
    </div>
  )
}

export default FormCargaProducts
