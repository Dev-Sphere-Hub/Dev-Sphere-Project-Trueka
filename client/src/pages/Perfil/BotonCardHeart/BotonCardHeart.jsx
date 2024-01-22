import React, { useState } from 'react'
import './heart.css'
import { useDispatch } from 'react-redux'
import { toggleLikeProduct } from '../../../features/productsSlice/productSlice'
import { toast } from 'react-toastify'

// recibir 1 objeto y una clase custon en formato string ("visible" o "invisible") esta clase controla la visibilidad del componente
const BotonCardHeart = ({ element, claseCustom }) => {
  const [activaHeart, setActivaHeart] = useState(false)
  const [addProductLike, setAddProductLike] = useState(false)
  // const [valorHeart, setValorHeart] = useState('')
  const dispatch = useDispatch()

  const onAddMeGusta = (e) => {
    e.preventDefault()
    setActivaHeart(!activaHeart)

    if (!activaHeart === true) {
      setTimeout(() => {
        setAddProductLike(true)
        dispatch(toggleLikeProduct(element))
        toast.success(`Se añdiio ${element.name} a tu lista de favoritos`)
      }, 3000)
    } else {
      setActivaHeart(false)
      setAddProductLike(false)
      dispatch(toggleLikeProduct(element))
      toast.info(`Se elimino ${element.name} de tu lista de favoritos`)
    }
  }

  // useEffect(() => {
  //   if (activaHeart === true) {
  //     setTimeout(() => {
  //       setAddProductLike(true)
  //       dispatch(toggleLikeProduct(element))
  //       toast.success(`Se añdiio ${element.name} a tu lista de favoritos`)
  //     }, 3000)
  //   } else {
  //     setActivaHeart(false)
  //     setAddProductLike(false)
  //     dispatch(toggleLikeProduct(element))
  //     toast.info(`Se elimino ${element.name} de tu lista de favoritos`)
  //   }
  // }, [activaHeart])

  return (
    <section className={`botoneraCard ${activaHeart ? 'visible' : claseCustom} `}>
      <div>
        <a className={`heart ${activaHeart ? 'like' : ''} ${addProductLike ? 'activo' : ''}`} onClick={(e) => onAddMeGusta(e)}>
          <ion-icon name='heart' style={{ color: activaHeart || addProductLike ? 'red' : 'black' }} />
        </a>
      </div>
    </section>
  )
}

export default BotonCardHeart
