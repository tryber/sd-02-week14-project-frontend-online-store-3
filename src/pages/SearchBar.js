import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ProductList from '../components/ProductList';
import * as productAPI from '../services/productAPI';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      categorySelected: '',
      categories: [],
      searchTerm: '',
      isShouldRedirect: false,
      totalItems: JSON.parse(localStorage.getItem('totalItems') || [0]),
    };
    this.createInputSearch = this.createInputSearch.bind(this);
    this.createCategories = this.createCategories.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onSelectedCategoryChange = this.onSelectedCategoryChange.bind(this);
    this.onChangeRedirect = this.onChangeRedirect.bind(this);
  }

  componentDidMount() {
    productAPI.getCategories()
      .then((categories) => this.setState({ categories }));
  }

  onChangeRedirect() {
    this.setState({
      isShouldRedirect: true,
    });
  }

  onSearchTextChange(e) {
    if (e.keyCode === 13 || e.type === 'click') {
      const { searchTerm } = this.state;
      this.setState({ query: searchTerm });
      e.target.value = '';
    }
  }

  onSelectedCategoryChange(event) {
    const { value } = event.target;
    this.setState((state) => {
      const categorySelected = state.categories.find((item) => item.name === value).id;
      return ({ categorySelected });
    });
  }

  createInputSearch() {
    const { totalItems } = this.state;
    return (
      <div className="header">
        <label htmlFor="text">
          <input
            id="text"
            type="text"
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
            onKeyUp={this.onSearchTextChange}
            className="input-search"
          />
        </label>
        <button type="button" className="cart" onClick={this.onChangeRedirect}>
          <p>{totalItems}</p>
        </button>
      </div>
    );
  }

  createCategories() {
    const { categories } = this.state;
    return (
      <div>
        <p>Categorias: </p>
        {categories.map(({ name, id }) => (
          <div>
            <input
              className="categories"
              type="radio"
              key={id}
              id={id}
              name="categories"
              value={name}
              onChange={this.onSelectedCategoryChange}
            />
            <label className="categories" htmlFor={id}>{name}</label>
          </div>
        ))}
      </div>
    );
  }

  totalItems() {
    let { totalItems } = this.state;
    totalItems = localStorage.getItem('totalItems');
    return this.setState({ totalItems });
  }

  render() {
    const { query, isShouldRedirect, categorySelected } = this.state;
    if (isShouldRedirect) return <Redirect to="/shopping_cart" />;
    return (
      <div className="main_page">
        {this.createInputSearch()}
        <div className="main_content">
          <div className="category_content">
            {this.createCategories()}
          </div>
          <div className="productList">
            <ProductList
              totalItems={() => this.totalItems()}
              categoryId={categorySelected}
              query={query}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
