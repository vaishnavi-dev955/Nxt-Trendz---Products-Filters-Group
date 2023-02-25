import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    activecategoryId: '',
    activeRatingId: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      activecategoryId,
      activeRatingId,
      searchInput,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activecategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  settingIntitalStateFilters = () => {
    this.getProducts()
  }

  UpdateCategoryId = categoryId => {
    this.setState({activecategoryId: categoryId}, this.getProducts)
  }

  UpdatingRatingId = ratingId => {
    this.setState({activeRatingId: ratingId}, this.getProducts)
  }

  onChangeSearch = searchInput => {
    this.setState({searchInput})
  }

  onClickSearch = () => {
    this.getProducts()
  }

  settingInitialStateFilters = () => {
    this.setState(
      {activecategoryId: '', activeRatingId: '', searchInput: ''},
      this.getProducts,
    )
    console.log('All Things are empty')
  }

  renderFailureView = () => (
    <div className="FailureView-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="noProducts-imageStyle"
      />
      <h1 className="noProducts-heading">Oops! Something Went Wrong</h1>
      <p className="noProducts-paragraph">
        We are having some trouble processing your request.
        <br />
        please try again
      </p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId, searchInput} = this.state
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          onChangeSearch={this.onChangeSearch}
          onClickSearch={this.onClickSearch}
          searchInput={searchInput}
        />
        {productsList.length > 0 ? (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        ) : (
          <div className="noProducts-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              alt="no products"
              className="noProducts-imageStyle"
            />
            <h1 className="noProducts-heading">No Products Found</h1>
            <p className="noProducts-paragraph">
              We could not find any products. Try Other Filters
            </p>
          </div>
        )}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}

        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          UpdateCategoryId={this.UpdateCategoryId}
          UpdatingRatingId={this.UpdatingRatingId}
          searchInput={searchInput}
          settingInitialStateFilters={this.settingInitialStateFilters}
        />

        {this.renderViews()}
      </div>
    )
  }
}

export default AllProductsSection
