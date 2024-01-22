import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setLat } from '../../features/location/location'

const MapWithSearch = ({ onInputChange, valueSearch }) => {
  const dispatch = useDispatch()

  const handleSearch = async () => {
    if (valueSearch !== '') {
      try {
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json',
          {
            params: {
              address: valueSearch,
              key: 'AIzaSyB4ehacPzGTBQ4iCrRK0APPkq8u7oMD4L8'
            }
          }
        )

        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location
          localStorage.setItem('latitude', lat)
          localStorage.setItem('longitude', lng)

          setTimeout(() => {
            dispatch(setLat(lat))
          }, 300)
        } else {
          console.log('no se obtuvieron resultados')
        }
      } catch (error) {
        console.error('Error al obtener la ubicación:', error)
      }
    }
  }

  return (
  // <div>
    <input
      type='text'
      // value={searchTerm}
      onChange={onInputChange}
      placeholder='Ej:Pais, Ciudad, Localidad'
      onBlur={handleSearch}
      name='location'
      className='form-control'
      id='input-bot'
    />
  //   <button onClick={handleSearch}>Buscar</button>
  //   {location && (
  //     <div>
  //       <p>Latitud: {location.lat}</p>
  //       <p>Longitud: {location.lng}</p>
  //     </div>
  //   )}
  // </div>
  )
}

export default MapWithSearch
