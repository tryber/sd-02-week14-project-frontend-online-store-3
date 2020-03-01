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
    const { categoryId, query, totalItems } = this.props;
    if (!products) {
      return (
        <h2 className="empty_list">Digite algum termo de pesquisa ou escolha uma categoria.</h2>
      );
    } if (products.length === 0) {
      return <h2 className="empty_list">Nenhum produto foi encontrado.</h2>;
    }
    return (
      <div className="product-list">
        {products.map((product) => (
          <ProductItem
            totalItems={totalItems}
            title={product.title}
            thumbnail={product.thumbnail}
            price={new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            }).format(product.price)}
            id={product.id}
            realPrice={product.price}
            quantity={1}
            productInfo={{ categoryId, query }}
            key={product.id}
          />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  categoryId: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  totalItems: PropTypes.func.isRequired,
};

export default ProductList;
