import React, { Component } from 'react';
import ProductItem from './ProductItem';
import * as ProductAPI from '../services/productAPI';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    }
  }

  componentDidUpdate() {
    ProductAPI.getCategories()
      .then(products => this.setState({ products }));
    ProductAPI.getQueryCategory()
      .then(products => this.setState({ products }));
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        {products.map(product => <ProductItem product={product} />)}
      </div>
    );
  }
}

export default ProductList;
