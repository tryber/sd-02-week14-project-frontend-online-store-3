import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PaymentMethod from '../components/PaymentMethod';
import ClientInfo from '../components/ClientInfo';
import ReviewCart from '../components/ReviewCart';
import returnButton from '../imgs/return.svg';
import './Checkout.css';
import * as data from '../services/data'

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientInfo: {},
      paymentMethod: '',
      isShouldRedirect: false,
      cart: [{ title: 'lucas', thumbnail: 'zé', quantity: 2, price: 2, id: 's' }, { title: 'lucas', thumbnail: 'zé', quantity: 2, price: 2, id: 's' }],
      totalPrice: 222,
    }

    this.addClientInfo = this.addClientInfo.bind(this);
    this.addPaymentMethod = this.addPaymentMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  addClientInfo(clientInfo) {
    const { name, value } = clientInfo.target;
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

  handleRedirect() {
    this.setState({
      isShouldRedirect: true,
    });
  }

  handleSubmit = (event) => {
    const { clientInfo, paymentMethod, cart, totalPrice } = this.state;
    localStorage.setItem('checkout', JSON.stringify([clientInfo, paymentMethod, cart, totalPrice]))
    alert('Parabéns, você contraiu uma dívida de: ' + this.state.totalPrice);
    event.preventDefault();
    this.handleRedirect();
  }

  render() {
    const { isShouldRedirect, paymentMethod, cart, totalPrice } = this.state;
    if (isShouldRedirect)
      return <Redirect to="/" />;
    return (
      <div className="checkout-page">
        <div>
          <img src={returnButton} onClick={this.handleRedirect} />
        </div>
        <ReviewCart cart={cart} totalPrice={totalPrice} />
        <ClientInfo addClientInfo={(event) => this.addClientInfo(event)} />
        <PaymentMethod addPaymentMethod={this.addPaymentMethod}
          paymentMethod={paymentMethod} />
        <div className='submit-button'>
          <button onClick={this.handleSubmit}>Comprar</button>
        </div>
      </div>
    )
  }
}

export default Checkout
