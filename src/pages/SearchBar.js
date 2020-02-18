import React, { Component } from 'react';
import ProductList from '../components/ProductList';
import { Redirect } from 'react-router-dom';
import * as productAPI from '../services/productAPI';
import lupa from '../imgs/lupa.svg';
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

  onSearchTextChange(event) { 
    
    if (event.keyCode === 13 || event.type === 'click') {
      const { searchTerm } = this.state ;
      this.setState({ query: searchTerm });
      event.target.value = '';
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
      <div className="header">
        <img src={lupa} alt="lupa" className="lupa" onClick={this.onSearchTextChange} />
    
        <label htmlFor="text">
        <input
          id="text"
          type="text"
          onChange={(e) => this.setState({ searchTerm: e.target.value})}
          onKeyUp={this.onSearchTextChange}
          className="input-search"
        />
      </label>
      <div className="cart" onClick={this.onChangeRedirect}>
        <p> 1 </p>                   
      </div>        
      </div>
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
    const { query, isShouldRedirect, categorySelected } = this.state
    if (isShouldRedirect) return <Redirect to="/banana"/>;
    return (
      <div className="main-page">
        {this.createInputSearch()}
        <div className="main-content" >
          <div className="categories">
            {this.createCategories()}
          </div>
          <div className="productList">
            <ProductList categoryId={categorySelected} query={query} />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
