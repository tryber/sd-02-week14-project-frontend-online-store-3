import React, { Component } from 'react';
import * as productAPI from '../services/productAPI';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
    };
  }

  componentDidMount(){
    const { product } = this.props.location.state;
    const { productInfo } = product;
    productAPI.getQueryNCategory(productInfo.categoryId, productInfo.query)
      .then(products => products.results.find(item => item.id === product.id))
      .then(response => response.attributes.map(product => this.setState(state => ({ attributes: [...state.attributes,`${product.name}: ${product.value_name}`] }))))
      // `${product.name}: ${product.value_name}`)
  }

  render() {
    const { product } = this.props.location.state;
    const { title, thumbnail, price } = product;
    const { attributes } = this.state;
    return (
      <div>
        <div>{title}</div>
        <div>{price}</div>
        <img src={thumbnail} alt={`imagem de um ${title}`} />
        <ul>
          {attributes.map(attribute => <li key={attribute}>{attribute}</li>)}
        </ul>
      </div>
    );
  }
}

export default ProductDetails;
