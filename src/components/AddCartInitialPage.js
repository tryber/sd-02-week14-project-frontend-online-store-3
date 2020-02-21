import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddCartInitialPage extends Component {
  constructor(props) {
    super(props);
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  addItemToCart() {
    const { product } = this.props;
    const totalItems = parseInt(localStorage.getItem('totalItems'), 10) || 0;
    if (!localStorage.products || localStorage.getItem('products') === 'null') {
      localStorage.setItem('totalItems', totalItems + 1);
      localStorage.setItem('products', JSON.stringify([product]));
      return product.totalItems();
    }
    const products = JSON.parse(localStorage.getItem('products'));
    if (localStorage.products.includes(product.id)) {
      const index = products.findIndex((item) => item.id === product.id);
      products[index].quantity += 1;
      localStorage.setItem('totalItems', totalItems + 1);
      localStorage.setItem('products', JSON.stringify(products));
      return product.totalItems();
    }
    localStorage.setItem('totalItems', totalItems + 1);
    localStorage.setItem('products', JSON.stringify([...products, product]));
    return product.totalItems();
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.addItemToCart}>Adicionar ao carrinho</button>
      </div>
    );
  }
}

AddCartInitialPage.propTypes = {
  product: PropTypes.string.isRequired,
};

export default AddCartInitialPage;
