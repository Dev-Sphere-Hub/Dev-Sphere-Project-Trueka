import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LocationName = () => {
  const location = useSelector((state) => state.location)
  const [locality, setLocality] = useState('')
  // console.log(locality)

  useEffect(() => {
    const getLocality = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyB4ehacPzGTBQ4iCrRK0APPkq8u7oMD4L8`
        )

        if (response.ok) {
          const data = await response.json()
          const result = data.results.find((result) =>
            result.types.includes('locality')
          )
          if (result) {
            setLocality(result.formatted_address)
          }
        } else {
          console.log(
            'Error en la geocodificación inversa:',
            response.statusText
          )
        }
      } catch (error) {
        console.log('Error en la geocodificación inversa:', error)
      }
    }

    getLocality()
  }, [location.latitude, location.longitude])

  return <div>{locality}</div>
}

export default LocationName
