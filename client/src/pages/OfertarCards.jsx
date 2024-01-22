import Card from 'react-bootstrap/Card'
import './OfertarCards.css'

function OfertarCards ({ prod }) {
  return (
    <div>
      <Card className='cards'>
        <Card.Img variant='top' src={prod.images} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Text>
            Ubicación
          </Card.Text>

        </Card.Body>
      </Card>

    </div>
  )
}

export default OfertarCards
