import React, { useState } from 'react'
import '../pages/styles/UserRegisterLogin.css'

const initialValues = {
  name: '',
  email: '',
  password: '',
  password2: ''
}

function Register () {
  const [state, setState] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <main>
      <h3 style={{ textAlign: 'center', margin: '20px' }}>Crear una cuenta</h3>
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <div className='form-content'>
          <label
            htmlFor='email'
          >Correo Electrónico
          </label>
          <input
            id='email'
            placeholder='Correo Electrónico'
            onChange={handleChange}
          />
          <label htmlFor='password'>Contraseña</label>
          <input
            placeholder='Contraseña'
            id='password'
            type='password'
            onChange={handleChange}
          />
          <label htmlFor='password2'>Repetir contraseña</label>
          <input
            id='password2'
            placeholder='Repetir Contraseña'
            type='password'
            onChange={handleChange}
          />
          <label htmlFor='name'>Nombres</label>
          <input
            id='name'
            placeholder='Nombres'
            onChange={handleChange}
          />
          <label htmlFor='lastName'>Apellido</label>
          <input
            id='lastName'
            placeholder='Apellido'
            onChange={handleChange}
          />
          <label htmlFor='userName'>Nombre de Usuario</label>
          <input
            id='userName'
            placeholder='Hasta 20 caracteres'
            onChange={handleChange}
          />
          <div style={{ textAlign: 'center' }}>
            <button
              className='button'
              type='submit'
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Register
