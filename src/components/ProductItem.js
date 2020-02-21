import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductItem.css';
import AddCartInitialPage from './AddCartInitialPage';

class ProductItem extends Component {
  render() {
    const {
      title, thumbnail, price, id, quantity, realPrice, productInfo,
    } = this.props;
    return (
      <div className="product-item">
        <div>
          <Link
            to={{
              pathname: `/products/${id}`,
              state: {
                product: {
                  title, thumbnail, price, id, quantity, realPrice, productInfo,
                },
              },
            }}
          >
            {title}
          </Link>
        </div>
        <div>
          <img src={thumbnail} alt={`imagem de um ${title}`} />
        </div>
        <div>
          {price}
        </div>
        <div>
          <AddCartInitialPage product={this.props} />
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  realPrice: PropTypes.number.isRequired,
  productInfo: PropTypes.func.isRequired,
};

export default ProductItem;
