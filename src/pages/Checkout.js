
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
      toBlur: '',
    };
    this.addClientInfo = this.addClientInfo.bind(this);
    this.addPaymentMethod = this.addPaymentMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.blurForms = this.blurForms.bind(this);
  }

  addClientInfo(Info) {
    const { name, value } = Info.target;
    const { clientInfo, errors } = this.state;
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (value === '') Info.target.style.border = '1px solid red';
    switch (name) {
      case 'CPF':
        if (value.length < 11) {
          errors.CPF = 'Insira um CPF válido';
          Info.target.style.border = '1px solid red';
        } else {
          errors.CPF = '';
          Info.target.style.border = '1px solid grey';
        }
        break;
      case 'Email':
        if (!validEmailRegex.test(value)) {
          errors.Email = 'Insira um email válido';
          Info.target.style.border = '1px solid red';
        } else {
          errors.Email = '';
          Info.target.style.border = '1px solid grey';
        }
        break;
      case 'Telefone':
        if (value.length < 12) {
          errors.Telefone = 'Insira um telefone válido';
          Info.target.style.border = '1px solid red';
        } else {
          errors.Telefone = '';
          Info.target.style.border = '1px solid grey';
        }
        break;
      case 'CEP':
        if (value.length < 8) {
          errors.CEP = 'Insira um CEP válido';
          Info.target.style.border = '1px solid red';
        } else {
          errors.CEP = '';
          Info.target.style.border = '1px solid grey';
        }
        break;
      default:
        Info.target.style.border = '1px solid grey';
        break;
    }

    this.setState({
      clientInfo: {
        ...clientInfo,
        [name]: value,
      },
      errors,
      toBlur: '',
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
    const { errors } = this.state;
    const valid = Object.values(errors).every((value) => value === '');
    return valid;
  }

  handleSubmit(event) {
    const { clientInfo, paymentMethod } = this.state;
    event.preventDefault();
    if (!paymentMethod) alert('Você precisa selecionar uma forma de pagamento.');
    else if (this.validateForm()) {
      localStorage.clear();
      localStorage.setItem('checkout', JSON.stringify([clientInfo, paymentMethod]));
      alert(`${clientInfo.nome}, vem pra Trybe!`);
      this.handleRedirect();
    } else {
      alert('Você precisa preencher os campos em vermelho corretamente!');
      this.blurForms();
    }
  }

  blurForms() {
    const { errors } = this.state;
    let toBlur = [];
    Object.entries(errors).forEach((key) => {
      if (key[1] !== '') toBlur = [...toBlur, key[0]];
    });
    this.setState({ toBlur });
  }

  render() {
    const {
      isShouldRedirect, paymentMethod, toBlur,
    } = this.state;
    if (isShouldRedirect) return <Redirect to="/" />;
    return (
      <div className="checkout-page">
        <div>
          <button type="button" onClick={this.handleRedirect}>VOLTAR</button>
        </div>
        <ReviewCart />
        <ClientInfo addClientInfo={(event) => this.addClientInfo(event)} toBlur={toBlur} />
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
