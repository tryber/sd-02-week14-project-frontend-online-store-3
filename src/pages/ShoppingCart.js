import React from 'react';
import { Link } from 'react-router-dom';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    const products = [
      {
        id: 1,
        title: 'Mouse',
        thumbnail: 'Imagem',
        price: 'R$ 500,50',
        quantity: 2,
      },
      {
        id: 2,
        title: 'Teclado',
        thumbnail: 'Imagem',
        price: 'R$ 32,00',
        quantity: 1,
      },
      {
        id: 3,
        title: 'Notebook',
        thumbnail: 'Imagem',
        price: 'R$ 2.550,50',
        quantity: 3,
      },
    ];

    localStorage.setItem('products', JSON.stringify(products));

    const teste = JSON.parse(localStorage.getItem('products'));

    this.state = {
      isEmpty: true,
      productsArr: teste,
    };
    this.removeFromCart = this.removeFromCart.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeQuantity(value, id) {
    const { productsArr } = this.state;
    parseInt(id);
    const teste = productsArr.findIndex(el => el.id === id)
    if (value === 'up')
      productsArr[teste].quantity += 1;
    else
      if (productsArr[teste].quantity > 1)
        productsArr[teste].quantity -= 1;
    this.setState({ productsArr });
  }

  createQtdButton(quantity, id) {
    this.x = 'Diminuir';
    return (
      <div className="flex_qtd_container">
        <div onClick={() => this.changeQuantity('down', id)}>{this.x}</div>
        <input type="input" className="input_qtd" value={quantity} />
        <div onClick={() => this.changeQuantity('up', id)}>Aumentar</div>
      </div>
    );
  }

  removeFromCart(event) {
    const { productsArr } = this.state;
    const { id } = event.target
    const items = productsArr.map(product => product.id).indexOf(parseInt(id));
    productsArr.splice(items, 1);
    this.setState({ productsArr });
  }

  createRemoveButton(id) {
    this.x = 'x';
    return (
      <div>
        <div id={id} onClick={this.removeFromCart}>{this.x}</div>
      </div>
    );
  }

  createProductInfos(title, thumbnail, price, id, quantity) {
    return (
      <div key={id} className="flex_cart_container">
        <div>
          {this.createRemoveButton(id)}
        </div>
        <div>
          {title}
        </div>
        <div>
          {thumbnail}
        </div>
        <div>
          {this.createQtdButton(quantity, id)}
        </div>
        <div>
          {price}
        </div>
      </div>
    );
  }

  totalPrice() {
    const { productsArr } = this.state
    let totalPrice = productsArr.reduce((acc, cur) => {
      const { price, quantity } = cur;
      let value = price.slice(3);
      value = value.replace('.', '');
      value = value.replace(',', '');
      value = parseFloat(value);
      const total = acc + (value * quantity);
      return total;
    }, 0);
    totalPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(totalPrice / 100);
    localStorage.setItem('totalPrice', totalPrice);
    return (
      <div>Valor total da compra: {totalPrice}</div>
    );
  }

  render() {
    const { productsArr } = this.state
    localStorage.setItem('products', JSON.stringify(productsArr));
    const { isEmpty } = this.state;
    if (isEmpty) {
      return (
        <div className="div_content">
          <Link to="/">Voltar</Link>
          <div className="div_container">
            {productsArr.map(({ title, thumbnail, price, id, quantity }) =>
              this.createProductInfos(title, thumbnail, price, id, quantity))}
          </div>
          <div className="div_container">
            {this.totalPrice()}
          </div>
        </div>
      );
    }
    return (
      <div>
        <p>Nao Vazio</p>
      </div>
    );
  }
}

export default ShoppingCart;
