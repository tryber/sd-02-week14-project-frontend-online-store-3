import React, { Component } from 'react';
import PropTypes from 'prop-types';
import estados from '../services/data';
import './ClientInfo.css';

class ClientInfo extends Component {
  constructor(props) {
    super(props);
    this.renderClientInfo = this.renderClientInfo.bind(this);
    this.createOption = this.createOption.bind(this);
  }

  createOption(type, name, placeholder) {
    const { addClientInfo, toBlur } = this.props;
    const blur = toBlur !== [] ? toBlur.find((el) => el === name) : '';
    const color = blur ? 'red' : '';
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={color}
        onBlur={addClientInfo}
      />
    );
  }

  renderClientInfo() {
    const { addClientInfo } = this.props;
    return (
      <div className="client-form">
        <form>
          {this.createOption('text', 'nome', 'Nome Completo')}
          {this.createOption('text', 'CPF', 'CPF')}
          {this.createOption('email', 'Email', 'Email')}
          {this.createOption('text', 'Telefone', 'Telefone')}
          {this.createOption('text', 'CEP', 'CEP')}
          {this.createOption('text', 'Endereço', 'Endereço')}
          {this.createOption('text', 'Complemento', 'Complemento')}
          {this.createOption('number', 'Número', 'Número')}
          {this.createOption('text', 'Cidade', 'Cidade')}
          <select name="estado" onChange={(event) => addClientInfo(event)}>
            <option selected="selected">Estado</option>
            {estados.map(({ id, sigla, nome }) => (
              <option
                key={id}
                value={sigla}
              >
                {nome}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="client-info">
        <h2>Informações do Comprador</h2>
        {this.renderClientInfo()}
      </div>
    );
  }
}

ClientInfo.propTypes = {
  addClientInfo: PropTypes.func.isRequired,
  toBlur: PropTypes.string.isRequired,
};

export default ClientInfo;
