import React from 'react';
import { Link } from 'react-router-dom';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    const teste = JSON.parse(localStorage.getItem('products'));
    this.state = {
      productsArr: teste,
    };
    this.removeFromCart = this.removeFromCart.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeQuantity(value, id) {
    const { productsArr } = this.state;
    parseInt(id, 10);
    const teste = productsArr.findIndex((el) => el.id === id);
    if (value === 'up') productsArr[teste].quantity += 1;
    else if (productsArr[teste].quantity > 1) productsArr[teste].quantity -= 1;
    this.setState({ productsArr });
  }

  createQtdButton(quantity, id) {
    this.x = '-';
    return (
      <div className="flex_qtd_container">
        <button
          className="button_content"
          type="button"
          onClick={() => this.changeQuantity('down', id)}
        >
          {this.x}
        </button>
        <input type="input" className="input_qtd" value={quantity} />
        <button
          className="button_content"
          type="button"
          onClick={() => this.changeQuantity('up', id)}
        >
          +
        </button>
      </div>
    );
  }

  removeFromCart(event) {
    const { productsArr } = this.state;
    const { id } = event.target;
    const items = productsArr.map((product) => product.id).indexOf(id);
    productsArr.splice(items, 1);
    this.setState({ productsArr });
  }

  createRemoveButton(id) {
    this.x = 'x';
    return (
      <div>
        <button
          className="button_content"
          type="button"
          id={id}
          onClick={this.removeFromCart}
        >
          {this.x}
        </button>
      </div>
    );
  }

  createProductInfos(title, thumbnail, price, id, quantity) {
    return (
      <div key={id} className="flex_cart_container">
        <div className="align">
          {this.createRemoveButton(id)}
        </div>
        <div className="align, image_content">
          <img src={thumbnail} alt={`imagem de um ${title}`} />
        </div>
        <div className="title_content align">
          {title}
        </div>
        <div className="align quantity_button">
          {this.createQtdButton(quantity, id)}
        </div>
        <div className="align">
          {price}
        </div>
      </div>
    );
  }

  totalCartItems() {
    const { productsArr } = this.state;
    if (productsArr) {
      const teste = productsArr.reduce((acc, cur) => {
        const quantity = parseInt((cur.quantity), 10);
        return acc + quantity;
      }, 0);
      localStorage.setItem('totalItems', teste);
    }
  }

  totalPrice() {
    const { productsArr } = this.state;
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
      <div>
        <h2>
          Valor total da compra:
          {totalPrice}
        </h2>
      </div>
    );
  }

  render() {
    const { productsArr } = this.state;
    this.totalCartItems();
    localStorage.setItem('products', JSON.stringify(productsArr));
    if (productsArr) {
      return (
        <div className="div_content">
          <Link to="/"><span>Voltar</span></Link>
          <div className="div_container">
            <div>
              <h2>Carrinho de compras: </h2>
            </div>
            {productsArr.map(({
              title, thumbnail, price, id, quantity,
            }) => this.createProductInfos(title, thumbnail, price, id, quantity))}
          </div>
          <div className="div_container">
            {this.totalPrice()}
          </div>
          <Link to="/checkout"><span>Finalizar compra</span></Link>
        </div>
      );
    }
    return (
      <div>
        <Link to="/"><span>Voltar</span></Link>
        <p className="empty_content">Carrinho vazio</p>
      </div>
    );
  }
}

export default ShoppingCart;
