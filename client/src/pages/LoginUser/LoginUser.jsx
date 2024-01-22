import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, loginWithGoogle } from '../../features/AutenticationSlice/AutenticationSlice'
import { useNavigate } from 'react-router'
import './LoginUserPruebas.css'

const LoginUser = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      default:
        break
    }
  }

  const resetStates = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    setErrors({})
    const validationErrors = {}

    if (!email) {
      validationErrors.email = 'El campo email es requerido'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      validationErrors.email = 'El campo email debe ser válido'
    }

    if (!password) {
      validationErrors.password = 'el campo password es requerido'
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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      console.log('correcto ->', user)

      dispatch(login(user))
        .then((response) => {
          console.log(response)
          resetStates()
          setTimeout(() => {
            navigate('/home')
          }, 4000)
        })
        .catch((error) => {
          console.log('Error al registrarse:', error)
        })
        .finally(() => {
          console.log('fin')
        })
      resetStates()
    }
  }

  const handleLoginGoogle = (e) => {
    e.preventDefault()
    console.log('login google')
    dispatch(loginWithGoogle())
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log('Error al iniciar sesión:', error)
      })
      .finally(() => {
        console.log('fin')
      }
      )
  }

  return (
    <>
      <section className='login-container d-flex flex-column justify-content-center align-items-center align-content-center gap-2' style={{ width: '100%', height: 'auto' }}>
        <img className='logo-img' src='/images/logo-login.svg' alt='Trueka logo image' />
        <p className='slogan'>Encontrá lo que buscás, cambialo por lo que ya no necesitás </p>
        <h5>Iniciar Sesión</h5>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-content'>
            <div>
              <section>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Correo Electrónico'
                  value={email}
                  onChange={handleChange}
                />
                {errors.email && <p className='error' style={{ padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '400' }}>{errors.email}</p>}
              </section>
            </div>

            <div className='pass-positioning'>
              <section>
                <input
                  id='password'
                  placeholder='Contraseña'
                  type='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
                {errors.password && <p className='error' style={{ padding: '5px', color: 'red', fontFamily: 'var(--titulo)', fontWeight: '400' }}>{errors.password}</p>}
              </section>
            </div>
            <div className='forgot-pass'>
              <Link to='/login'>Olvidé mi contraseña</Link>
            </div>
            <button type='submit' className='button'>Iniciar Sesión </button>

            <div className='new-account'>
              <span className='mt-2'>
                ¿No tenés una cuenta?
              </span>
              <Link
                to='/register2'
              >
                Crear cuenta
              </Link>
            </div>
            <hr id='hr' />
            <div className='login-alternatives'>
              <p>Ingresar con</p>
              <div className='loginExternos' onClick={handleLoginGoogle}>
                <ion-icon name='logo-google' />
              </div>
              <div className='loginExternos'>
                <ion-icon name='logo-facebook' />
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default LoginUser
