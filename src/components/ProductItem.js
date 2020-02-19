import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductItem.css';
import ButtonAddCart from './AddCartInitialPage';

class ProductItem extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <div className="product-item">
        <div>
          {title}
        </div>
        <div>
          <img src={thumbnail} alt={`imagem de um ${title}`} />
        </div>
        <div>
          {price}
        </div>
        <div>
          <Link to={{
            pathname: `/products/${id}`,
            state: {
              product: this.props
            }
          }}>Ver detalhes</Link>
        </div>
        <div>
          <ButtonAddCart product={this.props} />
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductItem;
