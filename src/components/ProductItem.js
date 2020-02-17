import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductItem.css';

class ProductItem extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
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
          {/* <Link to={`/products/${id}`}>Ver detalhes</Link> */}
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}

export default ProductItem;
