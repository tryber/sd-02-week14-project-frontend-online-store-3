import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PaymentMethod from '../components/PaymentMethod';
import ClientInfo from '../components/ClientInfo';
import returnButton from '../imgs/return.svg';
import './Checkout.css';
import * as data from '../services/data'

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: '',
      isShouldRedirect: false,
      cart: [{ thumbnail: "data:image/jpeg;base64,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", product: 'pera', quantity: 3, price: 3 }],
      totalPrice: 300,
    }
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleForms = this.handleForms.bind(this);
    this.addPaymentMethod = this.addPaymentMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderReturnButton = this.renderReturnButton.bind(this);
    this.renderReviewCart = this.renderReviewCart(this);
    this.renderClientInfo = this.renderClientInfo(this);  
    // this.renderSubmitButton = this.renderSubmitButton.bind(this);
  }

  handleRedirect() {
    this.setState({
      isShouldRedirect: true,
    });
  }

  handleForms = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      clientInfo: {
        ...this.state.clientInfo,
        [name]: value
      }
    }
    );
  }

  addPaymentMethod(paymentMethod) {
    console.log(paymentMethod)
    this.setState((state) => ({ paymentMethod }))
  }
  
  handleSubmit = (event) => {
    //salvar no storage

    alert('Parabéns, você contraiu uma dívida de: ' + this.state.totalPrice);
    event.preventDefault();
    this.handleRedirect();
  }
  renderReturnButton() {
    return (
      <div>
        <img src={returnButton} onClick={this.handleRedirect} />
      </div>
    )
  }
  renderReviewCart() {
    const { cart } = this.state
    const { totalPrice } = this.state
    return (
      <div className="review-cart">
        <h2>Revise seus Produtos</h2>
        <table className="shoppingCart">
          <tbody>
            {cart.map(({ thumbnail, product, quantity, price }) => {
              return (
                <tr key={product}>
                  <td><img src={thumbnail} /></td>
                  <td>{product}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <h2>Total: {totalPrice} </h2>
      </div>
    )
  }
  
  
  render() {
    const { isShouldRedirect, paymentMethod } = this.state
    if (isShouldRedirect) return <Redirect to="/" />;
    return (
      <div className="checkout-page">
        {this.renderReturnButton()}
        {this.renderReviewCart}

        {this.renderClientInfo}

        <PaymentMethod getPayment={this.addPaymentMethod} paymentMethod={paymentMethod} />
        <div className='submit-button'>
          <button onClick={this.handleSubmit}>Comprar</button>
        </div>
      </div>
    )
  }
}


export default Checkout
