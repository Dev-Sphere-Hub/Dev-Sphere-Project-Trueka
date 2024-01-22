import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import '../../pages/Detalle.css'

const Comments = (props) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState({
    message: messages,
    recipientId: props.props.product.owner,
    senderId: props.props.userID,
    targetItemid: props.props.product._id
  })

  useEffect(() => {
    const socket = io('https://backendrestfullseleccionado.online:3001')

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleSendMessage = (e) => {
    e.preventDefault()
    const socket = io('https://backendrestfullseleccionado.online:3001')
    socket.emit('message', newMessage)
    setNewMessage({
      message: '',
      recipientId: props.props.product.owner,
      senderId: props.props.userID,
      targetItemid: props.props.product._id
    })
  }

  return (
    <div className='comment-contenedor'>
      <h1>Chat de Comentarios</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index} className='comment-container'>
            <div className='comment-text'>{message}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type='text'
          className='message-input'
          value={newMessage.message}
          onChange={(e) =>
            setNewMessage({ ...newMessage, message: e.target.value })}
        />
        <button type='submit' className='button-Send'>Enviar</button>
      </form>
    </div>
  )
}

export default Comments
