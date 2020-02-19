import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddCartInitialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.addItemToCart = this.addItemToCart.bind(this);
  }

  addItemToCart() {
    const { product } = this.props;
    if (!localStorage.products) {
      return localStorage.setItem("products", JSON.stringify([product]));
    }
    const products = JSON.parse(localStorage.getItem("products"));
    if (localStorage.products.includes(product.id)) {
      const index = products.findIndex(item => item.id === product.id);
      console.log(index)
      products[index].quantity += 1;
      return localStorage.setItem("products", JSON.stringify(products));
    }
    localStorage.setItem("products", JSON.stringify([...products, product]));
  }

  render() {
    return (
      <div>
        <button onClick={this.addItemToCart}>Adicionar ao carrinho</button>
      </div>
    );
  }
}

AddCartInitialPage.propTypes = {
  product: PropTypes.string.isRequired,
};

export default AddCartInitialPage;
