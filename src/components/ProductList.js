import React, { Component } from 'react';
// import ProductItem from './ProductItem';
import * as productAPI from '../services/productAPI';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: '',
    };
  }

  componentDidMount() {
    // const { categorieId, query } = this.props;

    productAPI.getCategorie('MLB5672')
      .then((products) => {
        const allProducts = products.results;
        this.setState({ products: allProducts })
      })
      // .then((products) => products.results.map(product => {
      //   const { title, thumbnail, price } = product;
      //   this.setState(state => {
      //     console.log([...state.products, title, thumbnail, price]);
      //   })
      // }));

    // productAPI.getQuery(query)
    //   .then((products) => this.setState({ products }));

    // productAPI.getQueryNCategorie(categorieId, query)
    //   .then((products) => this.setState({ products }));
  }

  render() {
    const { products } = this.state;
    if (!products) return <div>vazio</div>;
    return (
      <div>
        {products.map(product => <li>{product.title}</li>)}
        {/* {products.map(product => <ProductItem product={product} />)} */}
      </div>
    );
  }
}

export default ProductList;
