import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedCategory: '',
    };
    this.createInputSearch = this.createInputSearch.bind(this);
    this.createGender = this.createGender.bind(this);
  }

  onSearchTextChange(event) {
    const { value } = event.target;
    this.setState({ searchText: value });
  }
  
  onSelectedCategoryChange(event) {
    const { value } = event.target;
    this.setState({ selectedCategory: value });

  createInputSearch() {
    return (
      <label htmlFor="text">
        <input
          id="text"
          type="text"
          value={searchText}
          onKeyUp={onSearchTextChange}
        />
      </label>
    );
  }

  createCategory() {    
    return (
      <label htmlFor="category">
        Categorias
        <select
          id="gender"
          value={selectedCategory}
          onChange={onSelectedCategoryChange}
        >
          <option value="">Todos</option>
          <option value="action">Ação</option>
          <option value="comedy">Comédia</option>
          <option value="thriller">Suspense</option>
        </select>
      </label>
    );
  }


    render() {
      return (
        <form>
          {this.createInputSearch()}
          <br />
          {this.createCheckbox()}
          <br />
          {this.createGender()}
          <br />
        </form>
      );
    }
  }

  export default SearchBar;
