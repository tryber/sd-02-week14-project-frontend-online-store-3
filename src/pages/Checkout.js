/* eslint-disable no-useless-escape */
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
      toBlur: [],
    };
    this.addClientInfo = this.addClientInfo.bind(this);
    this.addPaymentMethod = this.addPaymentMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  addClientInfo(Info) {
    const { name, value } = Info.target;
    const { clientInfo } = this.state;
    this.validateForm(name, value);
    this.setState({
      clientInfo: {
        ...clientInfo,
        [name]: value,
      },
    });
  }

  addPaymentMethod(paymentMethod) {
    this.setState(() => ({ paymentMethod }));
  }

  handleRedirect() {
    this.setState({
      isShouldRedirect: true,
    });
  }

  validateForm(name, value) {
    const { toBlur } = this.state;
    switch (name) {
      case 'CPF':
        this.validateCPF(name, value, toBlur);
        break;
      case 'Email':
        this.validateEmail(name, value, toBlur);
        break;
      case 'Telefone':
        this.validateTelefone(name, value, toBlur);
        break;
      case 'CEP':
        this.validateCEP(name, value, toBlur);
        break;
      default:
        this.validateDefault(name, value, toBlur);
        break;
    }
  }

  validateCPF(name, value, toBlur) {
    const validCPF = RegExp(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/);
    if (!validCPF.test(value)) {
      this.setState({ toBlur: [...toBlur, name] });
    } else {
      const clean = toBlur.filter((el) => el !== name);
      this.setState({ toBlur: [...clean] });
    }
  }

  validateEmail(name, value, toBlur) {
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (!validEmailRegex.test(value)) {
      this.setState({ toBlur: [...toBlur, name] });
    } else {
      const clean = toBlur.filter((el) => el !== name);
      this.setState({ toBlur: [...clean] });
    }
  }

  validateCEP(name, value, toBlur) {
    const validCEP = RegExp(/^[0-9]{8}$/);
    if (!validCEP.test(value)) {
      this.setState({ toBlur: [...toBlur, name] });
    } else {
      const clean = toBlur.filter((el) => el !== name);
      this.setState({ toBlur: [...clean] });
    }
  }

  validateTelefone(name, value, toBlur) {
    const validTelefone = RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/);
    if (!validTelefone.test(value)) {
      this.setState({ toBlur: [...toBlur, name] });
    } else {
      const clean = toBlur.filter((el) => el !== name);
      this.setState({ toBlur: [...clean] });
    }
  }

  validateDefault(name, value, toBlur) {
    if (value === '') {
      this.setState({ toBlur: [...toBlur, name] });
    } else {
      const clean = toBlur.filter((el) => el !== name);
      this.setState({ toBlur: [...clean] });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { clientInfo, paymentMethod, toBlur } = this.state;
    if (!paymentMethod) alert('Você precisa selecionar uma forma de pagamento.');
    else if (!clientInfo.nome) {
      alert('Você não preencheu nada!');
    } else if (toBlur.length !== 0) {
      alert('Você precisa preencher os campos corretamente!');
    } else {
      localStorage.clear();
      localStorage.setItem('checkout', JSON.stringify([clientInfo, paymentMethod]));
      alert(`${clientInfo.nome}, vem pra Trybe!`);
      this.handleRedirect();
    }
  }

  render() {
    const {
      isShouldRedirect, paymentMethod, toBlur,
    } = this.state;
    if (isShouldRedirect) return <Redirect to="/" />;
    return (
      <div className="checkout-page">
        <div>
          <button
            label="return"
            type="button"
            onClick={this.handleRedirect}
            className="return-button"
          />
        </div>
        <ReviewCart />
        <ClientInfo addClientInfo={(event) => this.addClientInfo(event)} toBlur={toBlur} />
        <PaymentMethod
          addPaymentMethod={this.addPaymentMethod}
          paymentMethod={paymentMethod}
        />
        <div className="submit-button">
          <button type="button" onClick={this.handleSubmit}>Concluir</button>
        </div>
      </div>
    );
  }
}

export default Checkout;
