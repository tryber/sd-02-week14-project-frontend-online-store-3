import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as productAPI from '../services/productAPI';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
    };

    this.incrementCount = this.incrementCount.bind(this);
    this.decreaseCount = this.decreaseCount.bind(this);
  }

  componentDidMount() {
    const { product } = this.props.location.state;
    const { productInfo } = product;
    productAPI.getQueryNCategory(productInfo.categoryId, productInfo.query)
      .then((products) => products.results.find((item) => item.id === product.id))
      .then((response) => response.attributes.map((element) =>
        this.setState((state) =>
          ({ attributes: [...state.attributes, `${element.name}: ${element.value_name}`] }))));
  }

  incrementCount() {

  }

  decreaseCount() {
    
  }

  render() {
    const { product } = this.props.location.state;
    const { title, thumbnail, price } = product;
    const { attributes } = this.state;
    return (
      <div>
        <div>
          <div>{title}</div>
          <div>{price}</div>
          <img src={thumbnail} alt={`imagem de um ${title}`} />
        </div>
        <div>
          <ul>
            {attributes.map((attribute) => <li key={attribute}>{attribute}</li>)}
          </ul>
        </div>
        <div>
          <p>Quantidade</p>
          <button onClick={this.decreaseCount}>-</button>
          <p></p>
          <button onClick={this.incrementCount}>+</button>
          <button>Adicionar ao carrinho</button>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      product: PropTypes.object,
    }),
  }).isRequired,
};

export default ProductDetails;
