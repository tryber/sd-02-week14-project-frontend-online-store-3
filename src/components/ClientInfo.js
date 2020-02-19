import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClientInfo extends Component {
  constructor(props) {
    super(props);    
    this.renderClientInfo = this.renderClientInfo.bind(this);
    this.createOption = this.createOption.bind(this);
  }

  createOption(type, name, placeholder){
    return (
      <input type={type}
      name={name}
      placeholder={placeholder}
      onChange={this.handleForms}
    />
    )
  }

renderClientInfo() {
  return (
    <div className="client-info">
      <h2>Informações do Comprador</h2>
      <form>
        {this.createOption('text','nome', 'Nome Completo')}
        {this.createOption('number','CPF', 'CPF')}
        {this.createOption('email','Email', 'Email')}
        {this.createOption('number','Telefone', 'Telefone')}
        {this.createOption('number','CEP', 'CEP')}
        {this.createOption('text','Endereço', 'Endereço')}
        {this.createOption('text','Complemento', 'Complemento')}
        {this.createOption('number','Número', 'Número')}
        {this.createOption('text','Cidade', 'Cidade')}  
        
           <select name="estado" onChange={this.handleForms}>
          <option selected="selected">Estado</option>
          {data.estados.map(({ id, sigla, nome }) => <option
            key={id}
            value={sigla}
          >
            {nome}
          </option>
          )}
        </select>

      </form>
    </div>
  )
}

render(){

}
}

export default ClientInfo
