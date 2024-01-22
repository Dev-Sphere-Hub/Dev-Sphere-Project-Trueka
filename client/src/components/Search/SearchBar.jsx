import { useState } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

import { useDispatch, useSelector } from 'react-redux'

import './search.css'

function SearchBar ({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const products = useSelector((state) => state?.productsDb?.products)
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    const filteredData = products.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    dispatch({ type: 'products/addToSearchResults', payload: filteredData })

    if (filteredData.length === 0 || searchTerm === '') {
      dispatch({ type: 'products/addToSearchResults', payload: 'none' })
    }
  }

  return (
    <>
      <Paper
        component='form'
        className='search'
        onSubmit={handleSearch}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Buscar'
          inputProps={{ 'aria-label': 'Buscar' }}
          onChange={(event) => setSearchTerm(event.target.value)}

        />
        <IconButton type='submit' className='lupita' aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  )
}

export default SearchBar
