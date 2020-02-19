import React, { Component } from 'react';
import PropTypes from 'prop-types';
import boleto from '../imgs/barcode.svg';
import card from '../imgs/creditcard.svg';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: '',
    }
    this.renderPaymentMethod = this.renderPaymentMethod.bind(this);
    this.createOption = this.createOption.bind(this);
  }

  createOption(cardBrand){
    return (
      <div className="radio">
        <label>
          <input type="radio" value={'cardBrand'}
            checked={paymentMethod === {'cardBrand'}}
            onChange={e => getPayment(e.target.value)} />
          {cardBrand} <img src={card} />
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

        createOption(card)

        <div className="radio">
          <label>
            <input type="radio" value="visa"
              checked={paymentMethod === 'visa'}
              onChange={e => getPayment(e.target.value)} />
            Visa <img src={card} />
          </label>
        </div>

        <div className="radio">
          <label>
            <input type="radio" value="mastercard"
              checked={paymentMethod === 'mastercard'}
              onChange={e => getPayment(e.target.value)} />
            MasterCard <img src={card} />
          </label>
        </div>

        <div className="radio">
          <label>
            <input type="radio" value="elo"
              checked={paymentMethod === 'elo'}
              onChange={e => getPayment(e.target.value)} />
            Elo <img src={card} />
          </label>
        </div>

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