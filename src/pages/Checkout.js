import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import returnButton from '../imgs/return.svg';
// import barCode from '../imgs/barcode.svg';
// import creditCard from '../imgs/creditCard';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formControls: {
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        cep: '',
        endereco: '',
        complemento: '',
        numero: '',
        cidade: '',
        estado: '',
      },
      paymentMethod: '',
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.renderReviewCart = this.renderReviewProduct.bind(this);
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: value
      }
    }
    );
  }

  handleOptionChange(event) {
    this.setState({
      paymentMethod: event.target.value
    });
  }

  renderReturnButton(){
    return(
      <img src={returnButton} />
    )
  }

  renderReviewCart() {
    return products.map((el) => {
      const { thumbnail, product, quantity, price } = data
      return (
        <tr key={id}>
          <td>{thumbnail}</td>
          <td>{product}</td>
          <td>{quantity}</td>
          <td>{price}</td>
        </tr>
      )
    })
  }

  renderClientInfo() {
    return (

      <div className="clientInfo">  
      <h2>Informações do Comprador</h2>
      <form>
        <input type="text"
          name="nome"
          placeholder="Nome Completo"
          value={this.state.formControls.nome.value}
          onChange={this.changeHandler}
        />
        <input type="number"
          name="cpf"
          placeholder="CPF"
          value={this.state.formControls.cpf.value}
          onChange={this.changeHandler}
        />
        <input type="email"
          name="email"
          placeholder="Email"
          value={this.state.formControls.email.value}
          onChange={this.changeHandler}
        />
        <input type="number"
          name="telefone"
          placeholder="Telefone"
          value={this.state.formControls.telefone.value}
          onChange={this.changeHandler}
        />
        <input type="number"
          name="cep"
          placeholder="CEP"
          value={this.state.formControls.cep.value}
          onChange={this.changeHandler}
        />
        <input type="text"
          name="endereco"
          placeholder="Endereço"
          value={this.state.formControls.endereco.value}
          onChange={this.changeHandler}
        />
        <input type="text"
          name="complemento"
          placeholder="Complemento"
          value={this.state.formControls.complemento.value}
          onChange={this.changeHandler}
        />
        <input type="number"
          name="numero"
          placeholder="Número"
          value={this.state.formControls.numero.value}
          onChange={this.changeHandler}
        />
        <input type="text"
          name="cidade"
          placeholder="Cidade"
          value={this.state.formControls.cidade.value}
          onChange={this.changeHandler}
        />
        <select name="estado" onChange={this.changeHandler}>
          <option selected hidden>Estado</option>
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
        </select>
      </form>
      </div>
    )
  }

  renderPaymentMethod() {
    render(
      <div className="paymentMethod">  
      <h2>Método de Pagamento</h2>
      <form>
        <div className="radio">
          <label>
            <input type="radio" value="boleto"
              checked={this.state.paymentMethod === 'boleto'}
              onChange={this.handleOptionChange} />
            Boleto
    </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="visa"
              checked={this.state.paymentMethod === 'visa'}
              onChange={this.handleOptionChange} />
            Visa <h2>Informações do Comprador</h2>
    </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="mastercard"
              checked={this.state.selectedOption === 'mastercard'}
              onChange={this.handleOptionChange} />
            MasterCard
    </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="elo"
              checked={this.state.selectedOption === 'elo'}
              onChange={this.handleOptionChange} />
            Elo
    </label>
        </div>
      </form>
      </div>
    )
  }

  renderSubmitButton(){
    return(
<button onclick={'comprar'}>Comprar</button>

    )
  }


  render() {

    return (
      <div className="checkoutPage">
        {this.renderReturnButton}
        <div className="reviewCart">
          <h2>Revise seus Produtos</h2>
          <table className="shoppingCart">
            <tbody>
              {this.renderReviewCart()}
            </tbody>
          </table>
          <h2>Total: {'total'}</h2>
        </div>
        
          {this.renderClientInfo()}      
          {this.renderPaymentMethod()}  

        <div className='submit'>
          {this.renderSubmitButton()}
        </div>

      </div>
     
    )

  }

}




export default Checkout
