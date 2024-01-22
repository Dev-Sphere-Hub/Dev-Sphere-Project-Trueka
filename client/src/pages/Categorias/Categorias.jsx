import CardProduct from '../../components/CardProduct'
import { useSelector } from 'react-redux'

const Categorias = () => {
  const productFilters = useSelector((state) => state?.productsDb?.productsByCategory)
  const gridTemplateColumns = productFilters.length < 6 ? 'repeat(auto-fit, minmax(170px, 200px))' : 'repeat(auto-fit, minmax(190px, 0.4fr))'

  return (
    <>
      <div className='home-container'>
        <div className='products-container' style={{ gridTemplateColumns }}>
          <CardProduct className='products-list' props={productFilters} />
        </div>
      </div>

    </>
  )
}

export default Categorias
