import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const {
    sortbyOptions,
    activeOptionId,
    onChangeSearch,
    searchInput,
    onClickSearch,
  } = props
  console.log(searchInput)
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }
  const onClickSearchEnter = event => {
    if (event.key === 'Enter') {
      onClickSearch()
    }
  }
  const onChangeSearchInput = event => {
    onChangeSearch(event.target.value)
  }

  return (
    <div className="products-header">
      <div className="input-container">
        <input
          type="search"
          placeholder="Search"
          onChange={onChangeSearchInput}
          value={searchInput}
          onKeyPress={onClickSearchEnter}
          className="input-style"
        />
        <img
          src="https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-vector-search-icon-png-image_316867.jpg"
          alt="search"
          className="search-logo"
        />
      </div>
      <h1 className="products-list-heading">All Products</h1>

      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
