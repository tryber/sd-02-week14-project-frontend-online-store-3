import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { categoryId, query } = this.props;

    productAPI.getCategory(categoryId)
      .then((products) => this.setState({ products: products.results }));

    productAPI.getQuery(query)
      .then((products) => this.setState({ products: products.results }));

    productAPI.getQueryNCategory(categoryId, query)
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
          );
        })}
      </div>
    );
  }
}

ProductList.propTypes = {
  categoryId: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};

export default ProductList;
