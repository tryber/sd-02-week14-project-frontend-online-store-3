import React, { Component } from 'react';

class ProductDetails extends Component {
  render() {
    const { product } = this.props.location.state;
    const { title, thumbnail, price } = product;
    return (
      <div>
        <div>{title}</div>
        <div>{price}</div>
        <img src={thumbnail} alt={`imagem de um ${title}`} />
      </div>
    );
  }
}

export default ProductDetails;
