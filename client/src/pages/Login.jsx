import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const initialValues = {
  email: '',
  password: ''
}

function Login () {
  const [state, setState] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  const handleGoogleLogin = () => {
    window.location.href = 'https://backendrestfullseleccionado.online/api/v1/google'
  }

  return (
    <main className='main-login'>
      <img className='logo-img' src='/images/logo-login.svg' alt='Trueka logo image' />
      <p className='slogan'>Encontrá lo que buscás, <br />
        cambialo por lo que ya no necesitás
      </p>
      <h5 className='iniciar-sesion'>Iniciar Sesión</h5>
      <form onSubmit={handleSubmit} className='formulario'>
        <div className='form-content'>
          <input
            id='email'
            placeholder='  Correo Electrónico'
            onChange={handleChange}
            className='input-email'
          />
          <div>
            <label for='password' />
            <input
              id='password'
              placeholder='  Contraseña'
              type='password'
              onChange={handleChange}
              className='contraseña'

            />

          </div>
          <div className='forgot-pass'>
            <Link to='/login' className='olvide'>Olvidé mi contraseña</Link>
          </div>
          <button
            className='button'
          >Iniciar Sesión
          </button>

          <div className='new-account'>
            <span className='mt-2 no-cuenta'>
              ¿No tenés una cuenta?
            </span>
            <Link
              to='/register'
            >
              Crear cuenta
            </Link>
          </div>

          <hr className='hr' />
          <br />
          <br />
          <div className='login-alternatives'>
            <p className='ingresar-con'>Ingresar con</p>
            <div className='google-facebook'>
              <img src='/images/google.svg' alt='Google icon' onClick={handleGoogleLogin} />
              <img src='/images/facebook.svg' alt='Facebook icon' />

            </div>

          </div>
        </div>
      </form>
    </main>
  )
}

export default Login
