import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomerRating from '../components/CustomerRating';
import './ProductDetails.css';
import * as productAPI from '../services/productAPI';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    const { product } = this.props.location.state;
    const { quantity } = product;

    this.state = {
      attributes: [],
      productCount: quantity,
      totalItems: parseInt(localStorage.getItem('totalItems'), 10) || 0,
    };

    this.decreaseCount = this.decreaseCount.bind(this);
    this.incrementCount = this.incrementCount.bind(this);
    this.addCart = this.addCart.bind(this);
  }

  componentDidMount() {
    const { product } = this.props.location.state;
    const { productInfo } = product;
    productAPI.getQueryNCategory(productInfo.categoryId, productInfo.query)
      .then((products) => products.results.find((item) => item.id === product.id))
      .then((response) => response.attributes.map((element) => this.setState((state) => ({
        attributes: [...state.attributes, `${element.name}: ${element.value_name}`],
      }))));
  }

  decreaseCount() {
    const { productCount } = this.state;
    if (productCount <= 1) return false;
    return this.setState({ productCount: productCount - 1 });
  }

  incrementCount() {
    const { productCount } = this.state;
    this.setState({ productCount: productCount + 1 });
  }

  addCart() {
    const { product } = this.props.location.state;
    const { productCount } = this.state;
    const { totalItems } = this.state;
    if (!localStorage.products) {
      localStorage.setItem('totalItems', (totalItems + productCount));
      product.quantity += productCount - 1;
      localStorage.setItem('products', JSON.stringify([product]));
      return this.setState({ productCount: 1 });
    }
    const products = JSON.parse(localStorage.getItem('products'));
    if (localStorage.products.includes(product.id)) {
      const index = products.findIndex((item) => item.id === product.id);
      products[index].quantity += productCount;
      localStorage.setItem('products', JSON.stringify(products));
      localStorage.setItem('totalItems', (totalItems + products[index].quantity));
      return this.setState({ productCount: 1 });
    }
    localStorage.setItem('totalItems', (totalItems + productCount));
    product.quantity += productCount - 1;
    localStorage.setItem('products', JSON.stringify([...products, product]));
    return this.setState({ productCount: 1 });
  }

  renderProductCount() {
    const { productCount } = this.state;
    return (
      <div>
        <section className="title">
          <h3>Quantidade</h3>
        </section>
        <section className="product_count">
          <button type="button" onClick={this.decreaseCount} className="product_counter">
            -
          </button>
          <div className="count_number">
            <p>{productCount}</p>
          </div>
          <button type="button" onClick={this.incrementCount} className="product_counter">
            +
          </button>
          <button type="button" onClick={this.addCart} className="add_cart">
            Adicionar ao carrinho
          </button>
        </section>
      </div>
    );
  }

  render() {
    const { product } = this.props.location.state;
    const { title, thumbnail, price } = product;
    const { attributes } = this.state;
    return (
      <div>
        <section className="title">
          <h3>{`${title}  -  ${price}`}</h3>
        </section>
        <section className="product_info">
          <img src={thumbnail} alt={`imagem de um ${title}`} className="product_image" />
          <ul className="product_attributes">
            <h4 style={{ marginTop: 0 }}>Especificações técnicas</h4>
            {attributes.map((attribute) =>
              <li className="attribute" key={attribute}>{attribute}</li>)
            }
          </ul>
        </section>
        {this.renderProductCount()}
        <div>
          <CustomerRating />
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
