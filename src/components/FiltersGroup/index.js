import './index.css'

const FilterItem = props => {
  const {FilterItemData, UpdateCategoryId} = props
  const {name, categoryId} = FilterItemData
  const onClickButton = () => {
    UpdateCategoryId(categoryId)
  }
  return (
    <li>
      <button type="button" onClick={onClickButton} className="category-button">
        <p className="paragraph">{name}</p>
      </button>
    </li>
  )
}

const RatingItem = props => {
  const {RatingItemData, UpdatingRatingId} = props
  const {imageUrl, ratingId} = RatingItemData
  const onClickRatingButton = () => {
    UpdatingRatingId(ratingId)
  }
  return (
    <li className="list-item">
      <button
        type="button"
        className="rating-button"
        onClick={onClickRatingButton}
      >
        <img
          src={imageUrl}
          alt={`rating${ratingId}`}
          className="rating-style"
        />
      </button>
      <p>& up</p>
    </li>
  )
}

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    UpdateCategoryId,
    UpdatingRatingId,
    settingInitialStateFilters,
  } = props

  const onClickClearFilters = () => {
    settingInitialStateFilters()
  }

  return (
    <div className="filters-group-container">
      <h1>Category</h1>
      <ul className="category-container">
        {categoryOptions.map(eachItem => (
          <FilterItem
            FilterItemData={eachItem}
            key={eachItem.categoryId}
            UpdateCategoryId={UpdateCategoryId}
          />
        ))}
      </ul>
      <h1>Rating</h1>
      <ul className="rating-container">
        {ratingsList.map(eachItem => (
          <RatingItem
            RatingItemData={eachItem}
            key={eachItem.ratingId}
            UpdatingRatingId={UpdatingRatingId}
          />
        ))}
      </ul>
      <button
        type="button"
        className="ClearFilters-button"
        onClick={onClickClearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
