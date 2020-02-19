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
    }
    this.handleRedirect = this.handleRedirect.bind(this);
    this.addPaymentMethod = this.addPaymentMethod.bind(this);
    this.addClientInfo = this.addClientInfo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderReturnButton = this.renderReturnButton.bind(this); 
  
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

  render() {
    const { isShouldRedirect, paymentMethod } = this.state
    if (isShouldRedirect) return <Redirect to="/" />;
    return (
      <div className="checkout-page">
        {this.renderReturnButton()}
        <ReviewCart />
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
