import React from 'react';
import { Link } from 'react-router-dom';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: true,
      products: [
        {
          title: 'Mouse',
          thumbnail: 'Imagem',
          price: 'R$ 500,50',
        },
        {
          title: 'Teclado',
          thumbnail: 'Imagem',
          price: 'R$ 32,00',
        },
        {
          title: 'Notebook',
          thumbnail: 'Imagem',
          price: 'R$ 2.550,50',
        },
      ],
      product: {
        title: 'Nome produto',
        thumbnail: 'Imagem',
        price: 'Preço',
      },
    };
  }

  createQtdButton() {
    this.x = "Diminuir"
    return (
      <div className="flex_qtd_container">
        <div>{x}</div>
        <input type="input" className="input_qtd" />
        <div>Aumentar</div>
      </div>
    );
  }

  createRemoveButton() {
    this.x = 'x'
    return (
      <div>
        <div>{x}</div>
      </div>
    );
  }

  createProductInfos() {
    const { product } = this.state;
    const { title, thumbnail, price } = product;
    return (
      <div className="flex_cart_container">
        <div>
          {this.createRemoveButton()}
        </div>
        <div>
          {title}
        </div>
        <div>
          {thumbnail}
        </div>
        <div>
          {this.createQtdButton()}
        </div>
        <div>
          {price}
        </div>
      </div>
    );
  }

  totalPrice() {
    const { products } = this.state;
    let totalPrice = products.reduce((acc, cur) => {
      const { price } = cur;
      let value = price.slice(3);
      value = value.replace('.', '');
      value = value.replace(',', '');
      value = parseFloat(value);
      const total = acc + value;
      return total;
    }, 0);
    totalPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(totalPrice / 100);
    return (
      <div>Valor total da compra: {totalPrice}</div>
    );
  }

  render() {
    const { isEmpty } = this.state;
    if (isEmpty) {
      return (
        <div>
          <Link to="/">Voltar</Link>
          <div>
            {this.createProductInfos()}
          </div>
          <div>
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
