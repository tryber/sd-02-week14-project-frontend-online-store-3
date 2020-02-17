import React, { Component } from 'react';
import ProductItem from './ProductItem';
import * as productAPI from '../services/productAPI';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: '',
    };
  }

  componentDidUpdate() {
    const { categorieId, query } = this.props;

    productAPI.getCategorie(categorieId)
      .then((products) => this.setState({ products: products.results }));

    productAPI.getQuery(query)
      .then((products) => this.setState({ products: products.results }));

    productAPI.getQueryNCategorie(categorieId, query)
      .then((products) => this.setState({ products: products.results }));
  }

  render() {
    const { products } = this.state;
    if (!products) return <div>Digite algum termo de pesquisa ou escolha uma categoria.</div>;
    return (
      <div>
        {products.map(product => {
          return (
            <ProductItem
              title={product.title}
              thumbnail={product.thumbnail}
              price={product.price}
            />
          )
        })}
      </div>
    );
  }
}

export default ProductList;
