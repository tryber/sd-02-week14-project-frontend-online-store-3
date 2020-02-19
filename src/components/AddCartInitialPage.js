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
    const { title, thumbnail, realPrice, id } = product;
    this.setState((state) => ({ products: [...state.products, product] }));
    localStorage.setItem(id, JSON.stringify({ title, thumbnail, realPrice }));
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
