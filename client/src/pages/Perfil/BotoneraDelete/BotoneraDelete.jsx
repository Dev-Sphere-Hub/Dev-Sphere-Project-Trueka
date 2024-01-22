import React from 'react'
import './botoneraDelete.css'

const BotoneraDelete = ({ func, id }) => {
  return (
    <section className='crudCard'>
      <button className='modifyCard'><ion-icon name='create' /></button>
      <button className='deleteCard' onClick={(e) => func(e, id)}><ion-icon name='trash' /></button>

    </section>
  )
}

export default BotoneraDelete
