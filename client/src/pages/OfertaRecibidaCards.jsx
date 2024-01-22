import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import './OfertaRecibidaCards.css'

function OfertaRecibidaCards({ prod }) {
    return (
        <Card className='cards'>
            <Card.Img variant="top" src={prod.imagen} className='imagen-cards-recibida' />
            <Card.Body>
                <Card.Title className='prod-titulo'>{prod.titulo}</Card.Title>
                <Card.Text className='prod-titulo'>
                    Ubicación: {prod.ubicacion}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default OfertaRecibidaCards;

