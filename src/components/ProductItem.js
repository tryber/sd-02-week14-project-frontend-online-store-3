import React, { Component } from 'react';
import './ProductItem.css';

class ProductItem extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <div className="cards-list">
        <div>
          {title}
        </div>
        <div>
          <img src={thumbnail} alt={`imagem de um ${title}`} />
        </div>
        <div>
          R$ {price}
        </div>
        <div>
          <Link to={`/products/${id}`}>Ver detalhes</Link>
        </div>
      </div>
    );
  }
}

export default ProductItem;
