import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './settingPerfil.css'
import { getUserById, modifyUser } from '../../features/authSlice/authSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const SettingPerfil = () => {
  const user = useSelector(state => state?.autenticacion?.user)
  const token = useSelector(state => state?.autenticacion?.token)
  const user2 = useSelector(state => state?.authUser?.userById)
  const update = useSelector(state => state?.authUser?.update)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')

  // permiten editar indivifualmente
  const [editEmail, setEditEmail] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [editFirstName, setEditFirstName] = useState(false)
  const [editLastName, setEditLastName] = useState(false)
  const [editContact, setEditContact] = useState(false)
  const [editAddress, setEditAddress] = useState(false)

  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  /*
  "email": "string",
  "password": "stringst",
  "firstName": "string",
  "lastName": "string",
  "contact": "string",
  "address": "string"
  */

  useEffect(() => {
    // dispatch(getUserById(user._id))
    console.log(user._id)
    console.log(token)
    dispatch(getUserById({ token, UserId: user._id }))
      .then((res) => {
        console.log('user db ->', res)
        const { email, password, firstName, lastName, contact, address } = res.payload
        setEmail(email || user.email)
        setPassword(password || user.password)
        setFirstName(firstName || user.firstName)
        setLastName(lastName || user.lastName)
        setContact(contact || user.contact)
        setAddress(address || user.address)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [dispatch, update])

  const handleUpdateUser = () => {
    // const dataUs = new FormData()
    // dataUs.append('email', email)
    // dataUs.append('password', password)
    // dataUs.append('firstName', firstName)
    // dataUs.append('lastName', lastName)
    // dataUs.append('contact', contact)
    // dataUs.append('address', address)

    const dataUs = {}
    dataUs.email = email
    dataUs.password = password
    dataUs.firstName = firstName
    dataUs.lastName = lastName
    dataUs.contact = contact
    dataUs.address = address

    setErrors({})
    const validationErrors = {}

    if (!email) {
      validationErrors.email = 'Email es requerido'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      validationErrors.email = 'ingrese un email valido'
    }

    if (!password) {
      validationErrors.password = 'Password es requeridp'
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

    if (!firstName) {
      validationErrors.firstName = 'El Nombre es requerido'
    }

    if (!lastName) {
      validationErrors.lastName = 'El apellido es requerido'
    }

    if (!contact) {
      validationErrors.contact = 'El numero de contacto es requerido'
    } else if (!/^\+(?:[0-9]\s?){6,14}[0-9]$/
      .test(contact)) {
      validationErrors.contact = 'ingrese un numero de contacto valido, ej +5492944123456'
    }

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
      console.log('data a cargar --> ', dataUs)
      dispatch(modifyUser({ token, userId: user._id, newUserData: dataUs }))
        .then((res) => {
          console.log('resp ->', res)
          if (res.payload.statusCode === 404) {
            toast.warning('error al actualizar perfil, intente mas tarde. codigo: ' + res.payload.statusCode)
            handleClearUser()
          } else if (res.error.message === 'Rejected') {
            toast.warning('error al actualizar perfil, intente mas tarde. codigo: ' + res.payload.message)
            handleClearUser()
          } else {
            toast.success('perfil actualizado correctamente')
            dispatch(getUserById({ token, UserId: user._id }))
              .then(() => {
                handleClearUser()
              })
          }
        })
        .catch((err) => {
          toast.error('error al actualizar perfil, intente mas tarde. codigo: ' + err.payload.message)
        })
        // .finally(() => {
        //   console.log('fin')
        //   handleClearUser()
        // })
    }
  }

  const handleClearUser = () => {
    console.log('handleClear ->', user)
    console.log(user2)
    setEmail(user2.email || user.email)
    setPassword(user2.password || user.password)
    setFirstName(user2.firstName || user.firstName)
    setLastName(user2.lastName || user.lastName)
    setContact(user2.contact || user.contact)
    setAddress(user2.address || user.address)

    setEditEmail(false)
    setEditPassword(false)
    setEditFirstName(false)
    setEditLastName(false)
    setEditContact(false)
    setEditAddress(false)

    setErrors({})
  }

  return (
    <section className='container mainPerfil' style={{ maxWidth: '450px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '3rem', gap: '1rem' }}>
      <h2>Editar Perfil</h2>

      <section className='containEditProfile'>
        <section className='edit-profile'>
          <img className='edit-profile__img' src={user?.picture} alt={user?.firstName} />
        </section>
        <button className='editImage'>
          <ion-icon name='pencil-sharp' />
        </button>
      </section>

      <section className='formModifyPerfil'>
        <div className='formGroup'>
          {
            !editFirstName
              ? (
                <div className='dpFormGen'>
                  <p className='pFormGen'>{user.firstName || 'Usuario'}</p>
                  <button className='editInputPerfil' onClick={() => setEditFirstName(true)}><ion-icon name='pencil-sharp' /></button>
                </div>
                )
              : (
                <input
                  className='inputFormGen'
                  type='text'
                  name='firstName'
                  placeholder='Nombre'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                )
          }
          {errors.firstName && <p style={{ width: '100%', padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '500', fontSize: '1rem', textAlign: 'left' }}>{errors.name}</p>}
        </div>

        <div className='formGroup'>
          {
            !editEmail
              ? (
                <div className='dpFormGen'>
                  <p className='pFormGen'>{user.email || 'Email'}</p>
                  <button className='editInputPerfil' onClick={() => setEditEmail(true)}><ion-icon name='pencil-sharp' /></button>
                </div>
                )
              : (
                <input
                  className='inputFormGen'
                  type='text'
                  name='email'
                  placeholder='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                )
          }
          {errors.email && <p style={{ width: '100%', padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '500', fontSize: '1rem', textAlign: 'left' }}>{errors.email}</p>}
        </div>

        <div className='formGroup'>
          {
            !editPassword
              ? (
                <div className='dpFormGen'>
                  <p className='pFormGen'>{user.password || 'Password'}</p>
                  <button className='editInputPerfil' onClick={() => setEditPassword(true)}><ion-icon name='pencil-sharp' /></button>
                </div>
                )
              : (
                <input
                  className='inputFormGen'
                  type='text'
                  name='password'
                  placeholder='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                )
          }
          {errors.password && <p style={{ width: '100%', padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '500', fontSize: '1rem', textAlign: 'left' }}>{errors.password}</p>}
        </div>

        <div className='formGroup'>
          {
            !editLastName
              ? (
                <div className='dpFormGen'>
                  <p className='pFormGen'>{user.lastName || 'Apellido'}</p>
                  <button className='editInputPerfil' onClick={() => setEditLastName(true)}><ion-icon name='pencil-sharp' /></button>
                </div>
                )
              : (
                <input
                  className='inputFormGen'
                  type='text'
                  name='lastName'
                  placeholder='lastName'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                )
          }
          {errors.lastName && <p style={{ width: '100%', padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '500', fontSize: '1rem', textAlign: 'left' }}>{errors.lastName}</p>}
        </div>

        <div className='formGroup'>
          {
            !editContact
              ? (
                <div className='dpFormGen'>
                  <p className='pFormGen'>{user.contact || 'telefono: +54...'} </p>
                  <button className='editInputPerfil' onClick={() => setEditContact(true)}><ion-icon name='pencil-sharp' /></button>
                </div>
                )
              : (
                <input
                  className='inputFormGen'
                  type='text'
                  name='contact'
                  placeholder='telefono +5492944123456'
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                )
          }
          {errors.contact && <p style={{ width: '100%', padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '500', fontSize: '1rem', textAlign: 'left' }}>{errors.contact}</p>}
        </div>
        <div className='formGroup'>
          {
            !editAddress
              ? (
                <div className='dpFormGen'>
                  <p className='pFormGen'>{user.address || 'Pais, ciudad, localidad'}</p>
                  <button className='editInputPerfil' onClick={() => setEditAddress(true)}><ion-icon name='pencil-sharp' /></button>
                </div>
                )
              : (
                <input
                  className='inputFormGen'
                  type='text'
                  name='address'
                  placeholder='pais, ciudad, localidad'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                )
          }
          {errors.address && <p style={{ width: '100%', padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '500', fontSize: '1rem', textAlign: 'left' }}>{errors.address}</p>}
        </div>
        <div className='ButonGroup'>
          <button className='boton' onClick={handleUpdateUser}>Guardar Cambio</button>
          <button className='boton butonReset' onClick={() => handleClearUser()}><ion-icon name='refresh-sharp' /></button>
        </div>
      </section>

      <Link to='/calificar' className='linkHome'>SETTINGS</Link>
    </section>
  )
}

export default SettingPerfil

// dispatch(getUserById({ token, UserId: user._id }))
// // handleClearUser()
