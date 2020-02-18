import React, { Component } from 'react';
import ProductList from '../components/ProductList';
import * as productAPI from '../services/productAPI';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      categorySelected: '',
      categories: [],
    };
    this.createInputSearch = this.createInputSearch.bind(this);
    this.createCategories = this.createCategories.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onSelectedCategoryChange = this.onSelectedCategoryChange.bind(this);
  }

  componentDidMount() {
    productAPI.getCategories()
      .then((categories) => this.setState({ categories }));
  }

  onSearchTextChange(event) {
    if (event.keyCode === 13) {
      const { value } = event.target;
      this.setState({ query: value });
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
    return (
      <label htmlFor="text">
        <input
          id="text"
          type="text"
          onKeyUp={this.onSearchTextChange}
        />
      </label>
    );
  }
  createCategories() {
    const { categories } = this.state;
    return (
      <label htmlFor="categories">
        Categorias
        <select id="categories" onChange={this.onSelectedCategoryChange}>
          {categories.map(({ name, id }) => (<option key={id} value={name}>{name}</option>),
          )}
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        <div className="search-bar">
          {this.createInputSearch()}
        </div>
        <div>
          <div className="categories">
            {this.createCategories()}
          </div>
          <div className="productList">
            <ProductList categoryId={this.state.categorySelected} query={this.state.query} />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
