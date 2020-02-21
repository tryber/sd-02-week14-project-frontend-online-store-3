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
    console.log(paymentMethod);
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
        if (value.length < 11) {
          this.setState({ toBlur: [...toBlur, name] });
        } else {
          const clean = toBlur.filter((el) => el !== name);
          this.setState({ toBlur: [...clean] });
        }
        break;
      case 'Email':
        if (value.length < 11) {
          this.setState({ toBlur: [...toBlur, name] });
        } else {
          const clean = toBlur.filter((el) => el !== name);
          this.setState({ toBlur: [...clean] });
        }
        break;
      default:
        if (value === '') {
          this.setState({ toBlur: [...toBlur, name] });
        } else {
          const clean = toBlur.filter((el) => el !== name);
          this.setState({ toBlur: [...clean] });
        }
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { clientInfo, paymentMethod, toBlur } = this.state;
    if (!paymentMethod) alert('Você precisa selecionar uma forma de pagamento.');
    else if (toBlur === []) {
      localStorage.clear();
      localStorage.setItem('checkout', JSON.stringify([clientInfo, paymentMethod]));
      alert(`${clientInfo.nome}, vem pra Trybe!`);
      this.handleRedirect();
    } else {
      alert('Você precisa preencher os campos em vermelho corretamente!');
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
