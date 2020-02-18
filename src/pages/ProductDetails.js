import React, { Component } from 'react';

class ProductDetails extends Component {

  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div>
        <div>{title}</div>
        <div>{price}</div>
        <img src={thumbnail} alt={`imagem de um ${title}`} />
      </div>
    )
  }
}

export default ProductDetails;
