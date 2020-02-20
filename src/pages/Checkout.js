import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PaymentMethod from '../components/PaymentMethod';
import ClientInfo from '../components/ClientInfo';
import ReviewCart from '../components/ReviewCart';
import './Checkout.css';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientInfo: {},
      paymentMethod: false,
      isShouldRedirect: false,
    };
    this.addClientInfo = this.addClientInfo.bind(this);
    this.addPaymentMethod = this.addPaymentMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  addClientInfo(Info) {
    const { name, value } = Info.target;
    const { clientInfo } = this.state;
    this.setState({
      clientInfo: {
        ...clientInfo,
        [name]: value,
      },
    });
  }

  addPaymentMethod(paymentMethod) {
    console.log(paymentMethod);
    this.setState(() => ({ paymentMethod }));
  }

  handleRedirect() {
    this.setState({
      isShouldRedirect: true,
    });
  }

  handleSubmit(event) {
    //validação
    const {
      clientInfo, paymentMethod, cart, totalPrice,
    } = this.state;
    // localStorage.clear();
    localStorage.setItem('checkout', JSON.stringify([clientInfo, paymentMethod, totalPrice]));
    alert(`Parabéns, você contraiu uma dívida de: ${totalPrice}`);
    event.preventDefault();
    this.handleRedirect();
  }

  render() {
    const {
      isShouldRedirect, paymentMethod, cart, totalPrice,
    } = this.state;
    if (isShouldRedirect) return <Redirect to="/" />;
    return (
      <div className="checkout-page">
        <div>
          <button type="button" onClick={this.handleRedirect}>VOLTAR</button>
        </div>
        <ReviewCart cart={cart} totalPrice={totalPrice} />
        <ClientInfo addClientInfo={(event) => this.addClientInfo(event)} />
        <PaymentMethod
          addPaymentMethod={this.addPaymentMethod}
          paymentMethod={paymentMethod}
        />
        <div className="submit-button">
          <button type="button" onClick={this.handleSubmit}>Comprar</button>
        </div>
      </div>
    );
  }
}

export default Checkout;
