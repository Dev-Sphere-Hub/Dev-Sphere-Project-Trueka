const filtersProductsByKeyword = (products, searchTerm) => {
  return products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export default filtersProductsByKeyword
