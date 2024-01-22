import Spinner from 'react-bootstrap/Spinner'
import React from 'react'

const Loading = ({ variant }) => {
  return (
    <Spinner animation='border' variant={variant || 'danger'} role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}

export default Loading
