import React, { useState } from 'react'
import { createUser } from '../../features/authSlice/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import './registe.css'
import Loading from '../../components/Loading'

const RegisterUser = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoader] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { value, name } = e.target

    switch (name) {
      case 'name':
        setName(value)
        break
      case 'lastname':
        setLastname(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'contact':
        setContact(value)
        break
      case 'address':
        setAddress(value)
        break
      default:
        break
    }
  }

  const resetStates = () => {
    setName('')
    setLastname('')
    setEmail('')
    setPassword('')
    setContact('')
    setAddress('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userRegister = {
      email,
      password,
      firstName: name,
      lastName: lastname,
      contact,
      address
    }

    setErrors({})

    const validationErrors = {}

    // Realizar las validaciones necesarias
    if (!name) {
      validationErrors.name = 'Por favor, ingrese su nombre'
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      validationErrors.name = 'El nombre solo debe contener letras y espacios'
    }

    if (!lastname.trim()) {
      validationErrors.lastname = 'Por favor, ingrese su apellido'
    } else if (!/^[a-zA-Z\s]+$/.test(lastname)) {
      validationErrors.lastname = 'El apellido solo debe contener letras y espacios'
    }

    if (!email.trim()) {
      validationErrors.email = 'Por favor, ingrese su email'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      validationErrors.email = 'Por favor, ingrese un email válido'
    }

    // validamos contraseña
    if (!password) {
      validationErrors.password = 'El password es requerido'
    } else if (password.length < 8) {
      validationErrors.password = 'El password no puede ser inferior a 8 caracteres'
    } else if (!/(?=.*[!@#$%^&*()\-_=+{};:,<.>])/.test(password)) {
      validationErrors.password = 'La contraseña debe tener al menos un caracter especial'
    } else if (!/(?=.*[a-z])/.test(password)) {
      validationErrors.password = 'La contraseña debe tener al menos una letra minúscula'
    } else if (!/(?=.*[A-Z])/.test(password)) {
      validationErrors.password = 'La contraseña debe tener al menos una letra mayúscula'
    } else if (!/(?=.*\d)/.test(password)) {
      validationErrors.password = 'La contraseña debe tener al menos un número'
    }

    // validamos numero de telefono
    if (!contact) {
      validationErrors.contact = 'El numero de telefono es requerido'
    } else if (contact.length < 8) {
      validationErrors.contact = 'El numero de telefono no puede ser inferior a 8 caracteres'
    } else if (!/^[0-9]+$/.test(contact)) {
      validationErrors.contact = 'El numero de telefono solo debe contener nÚmeros'
    }

    // validamos direccion
    if (!address) {
      validationErrors.address = 'La direccion es requerida'
    } else if (address.length < 8) {
      validationErrors.address = 'La direccion no puede ser inferior a 8 caracteres'
    } else {
      const addressParts = address.split(',').map((part) => part.trim())
      if (addressParts.length < 2) {
        validationErrors.address = 'La dirección debe contener al menos país y ciudad, localidad, barrio'
      } else {
        for (const part of addressParts) {
          if (!part) {
            validationErrors.address = 'La dirección debe tener valores para país, ciudad/localidad/barrio'
            break
          }
        }
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else if (Object.keys(validationErrors).length === 0) {
      setLoader(true)

      setErrors({})
      dispatch(createUser(userRegister))
        .then((response) => {
          console.log('THEN ->', response)
          if (response.payload.statusCode === 400) {
            toast.error('Error al registrarse, el usuario ya existe')
            resetStates()
          } else {
            toast.success('Usuario creado correctamente')
            toast.info('redirigiendote a login')
            setTimeout(() => {
              resetStates()
              navigate('/login2')
            }, 4000)
          }
        })
        .catch((error) => {
          console.log('Error al registrarse:', error)
          toast.error('Error al registrarse')
        })
        .finally(() => {
          setLoader(false)
        })
    }
  }

  return (
    <>
      <section className='d-flex flex-column justify-content-center align-items-center align-content-center gap-2' style={{ width: '100%', height: 'auto' }}>
        <h3 style={{ textAlign: 'center', margin: '20px' }}>Crear una cuenta</h3>
        <form
          className='formRegister d-flex flex-column justify-content-center align-items-center align-content-center gap-2'
          onSubmit={handleSubmit}
        >
          <div className='form-content'>
            <label
              htmlFor='email'
            >Correo Electrónico
            </label>
            <input
              className='inputGen'
              name='email'
              value={email}
              placeholder='Correo Electrónico'
              onChange={handleChange}
            />
            {errors.email && <p className='error' style={{ padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '400' }}>{errors.email}</p>}

            <label htmlFor='password'>Contraseña</label>
            <input
              className='inputGen'
              placeholder='Contraseña'
              type='password'
              value={password}
              name='password'
              onChange={handleChange}
            />
            {errors.password && <p className='error' style={{ padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '400' }}>{errors.password}</p>}

            <label htmlFor='name'>Nombres</label>
            <input
              className='inputGen'
              placeholder='Nombres'
              type='text'
              name='name'
              value={name}
              onChange={handleChange}
            />
            {errors.name && <p className='error' style={{ padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '400' }}>{errors.name}</p>}

            <label htmlFor='lastName'>Apellido</label>
            <input
              className='inputGen'
              type='text'
              placeholder='Apellido'
              name='lastname'
              value={lastname}
              onChange={handleChange}
            />
            {errors.lastname && <p className='error' style={{ padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '400' }}>{errors.lastname}</p>}

            <label htmlFor='contact'>Numero de telefono</label>
            <input
              className='inputGen'
              type='text'
              placeholder='Hasta 20 caracteres'
              name='contact'
              value={contact}
              onChange={handleChange}
            />
            {errors.contact && <p className='error' style={{ padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '400' }}>{errors.contact}</p>}

            <label htmlFor='address'>Direccion</label>
            <input
              className='inputGen'
              type='text'
              placeholder='Hasta 20 caracteres'
              name='address'
              value={address}
              onChange={handleChange}
            />
            {errors.address && <p className='error' style={{ padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '400' }}>{errors.address}</p>}

            <div style={{ textAlign: 'center' }}>
              <button
                className='button' type={`${loading ? 'button' : 'submit'}`} style={{ display: 'grid', placeItems: 'center', cursor: loading ? 'none' : 'pointer' }}
              >
                {loading ? <Loading /> : 'Crear cuenta'}

              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default RegisterUser
