/* eslint-disable react/jsx-closing-tag-location */
import './styles/input.css'

function Input ({ children, type, ids, placeh, name, onInputChange, categories, opcion }) {
  const id = ids === 'input-bot' ? 'input-bot' : 'input-desc'

  return (
    <>
      {type === 'text' && ids === 'input-bot'
        ? (
          <>
            <p className='input-title'>{children}</p>
            <input type='text' className='form-control' id={id} placeholder={placeh} name={name} onChange={onInputChange} />
          </>
          )
        : (
            ids === 'input-desc' && type === 'text'
              ? (<>
                <p className='input-title'>{children}</p>
                <textarea type='text' className='form-control' id={id} placeholder={placeh} name={name} onChange={onInputChange} />
              </>)
              : <>
                <p className='input-title'>{children}</p>
                <select className='form-select' aria-label='Default select example' id='input-bot' name={name} onChange={onInputChange}>
                  <option value='' id='category-options'>Seleccione la {opcion}</option>
                  {categories
                    ? categories.map((category, i) => (
                      <option key={i} value={category._id} id='category-options'>{category.name}</option>
                    ))
                    : ''}
                </select>
              </>
          )}

    </>
  )
}

export default Input
