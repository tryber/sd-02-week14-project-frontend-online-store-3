
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
      errors: {},
    };
    this.addClientInfo = this.addClientInfo.bind(this);
    this.addPaymentMethod = this.addPaymentMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  addClientInfo(Info) {
    const { name, value } = Info.target;
    const { clientInfo, errors } = this.state;
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    switch (name) {
      case 'nome':
        errors.nome = value.length < 5
          ? 'O nome completo deve possuir mais de 5 letras'
          : '';
        break;
      case 'CPF':
        errors.CPF = validCPFRegex.test(value)
          ? 'Insira um CPF válido'
          : '';
        break;
      case 'Email':
        errors.Email = validEmailRegex.test(value)
          ? ''
          : 'Email is not valid!';
        break;
      default:
        break;
    }
    this.setState({
      clientInfo: {
        ...clientInfo,
        [name]: value,
      },
      errors,
      [name]: value,
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

  validateForm() {
    const { paymentMethod, errors } = this.state;
    const valid = Object.values(errors).every((value) => value === '');
    return (valid && paymentMethod);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      const { clientInfo, paymentMethod } = this.state
      console.info('Valid Form');
      localStorage.clear();
      localStorage.setItem('checkout', JSON.stringify([clientInfo, paymentMethod]));
      alert(`${clientInfo.nome}, vem pra Trybe!`);
      this.handleRedirect();
    } else {
      console.error('Invalid Form');
    }
  }


  render() {
    const {
      isShouldRedirect, paymentMethod,
    } = this.state;
    if (isShouldRedirect) return <Redirect to="/" />;
    return (
      <div className="checkout-page">
        <div>
          <button type="button" onClick={this.handleRedirect}>VOLTAR</button>
        </div>
        <ReviewCart />
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
