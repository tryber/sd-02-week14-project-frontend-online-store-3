import React, { Component } from 'react';

class ButtonAddCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.addItemToCart = this.addItemToCart.bind(this);
  }

  addItemToCart() {
    const { product } = this.props;
    const { title, thumbnail, price, id } = product;
    this.setState(state => ({ products: [...state.products, product] }))
    localStorage.setItem(id, JSON.stringify({title, thumbnail, price}));
  }

  render() {
    return (
      <div>
        <button onClick={this.addItemToCart}>Adicionar ao carrinho</button>
      </div>
    )
  }
}

export default ButtonAddCart;
