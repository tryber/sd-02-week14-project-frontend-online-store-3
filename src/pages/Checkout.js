import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import returnButton from '../imgs/botaovoltar.svg';

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
    this.changeHandler = this.changeHandler.bind(this)
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

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }

  render() {
    return (
      <div className="checkout">
        <img src={returnButton} />
        <div id="1">
          <h2>Revise seus Produtos</h2>
          <div id="shoppingCart">
            <img id="thumbnail" />
            <p>{'product'}</p>
            <p>{'price'}</p>
          </div>
          <h2>Total: {'total'}</h2>
        </div>
        <div id="2">
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
        <div id="3">
          <h2>Método de Pagamento</h2>

          <form>
    <div className="radio">
      <h3>Boleto</h3>
      <label>
        <input type="radio" value="option1" 
                      checked={this.state.selectedOption === 'option1'} 
                      onChange={this.handleOptionChange} />
        Boleto
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="option2" 
                      checked={this.state.selectedOption === 'option2'} 
                      onChange={this.handleOptionChange} />
        Visa
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="option3" 
                      checked={this.state.selectedOption === 'option3'} 
                      onChange={this.handleOptionChange} />
        MasterCard
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="option3" 
                      checked={this.state.selectedOption === 'option3'} 
                      onChange={this.handleOptionChange} />
        Elo
      </label>
    </div>
  </form>        
      </div>
<div id="4">
  <button onclick={'comprar'}>Comprar</button>
</div>


</div>

    )

  }

}




export default Checkout
