import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';
import * as productAPI from '../services/productAPI';
import './ProductList.css';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { categoryId, query } = this.props;

    if (categoryId !== prevProps.categoryId || query !== prevProps.query) {
      return productAPI.getQueryNCategory(categoryId, query)
        .then((products) => this.setState({ products: products.results }));
    }
    return false;
  }

  render() {
    const { products } = this.state;
    if (!products) return <div>Digite algum termo de pesquisa ou escolha uma categoria.</div>;
    return (
      <div className="product-list">
        {products.map((product) =>
          <ProductItem
            title={product.title}
            thumbnail={product.thumbnail}
            price={new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            }).format(product.price)}
            id={product.id}
            productInfo={this.props}
            key={product.id}
          />,
        )}
      </div>
    );
  }
}

ProductList.propTypes = {
  categoryId: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};

export default ProductList;
