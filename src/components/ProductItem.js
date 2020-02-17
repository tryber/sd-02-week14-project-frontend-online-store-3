import React, { Component } from 'react';

class ProductItem extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div>
        <div>
          {title}
        </div>
        <div>
          <img src={thumbnail} alt={`imagem de um ${title}`} />
        </div>
          R$ {price}
      </div>
    );
  }
}

export default ProductItem;
