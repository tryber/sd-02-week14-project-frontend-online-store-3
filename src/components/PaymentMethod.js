import React, { Component } from 'react';
import PropTypes from 'prop-types';
import barCode from '../imgs/barcode.svg';
import card from '../imgs/creditcard.svg';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);    
    this.renderPaymentMethod = this.renderPaymentMethod.bind(this);
    this.createOption = this.createOption.bind(this);
  }

  createOption(option) {
    const { paymentMethod, getPayment } = this.props;
    return (
      <div className="radio">
        <label>
          <input type="radio" value={option}
            checked={paymentMethod === option}
            onChange={e => getPayment(e.target.value)} />
          {option} <img src={card} />
        </label>
      </div>
    )
  }

  renderPaymentMethod() {
    const { paymentMethod, getPayment } = this.props;
    return (
      <form>
        <div className="radio">
          <label>
            <input type="radio" value="boleto"
              checked={paymentMethod === 'boleto'}
              onChange={e => getPayment(e.target.value)} />
            Boleto <img src={barCode} />
          </label>
        </div>
        {this.createOption('Visa')}
        {this.createOption('MasterCard')}
        {this.createOption('Elo')}
      </form>
    )
  }

  render() {
    return (
      <div className="payment-method">
        <h2>Método de Pagamento</h2>
        {this.renderPaymentMethod()}
      </div>
    )
  }
}

export default PaymentMethod