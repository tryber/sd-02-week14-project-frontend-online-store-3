import React from 'react';

function ReviewCart() {
  const cart = JSON.parse(localStorage.getItem('products'));
  const totalPrice = localStorage.getItem('totalPrice');
  if (cart === null) {
    return (
      <div>
        <h1>Carrinho vazio</h1>
      </div>
    );
  }
  return (
    <div className="review-cart">
      <h2>Revise seus Produtos</h2>
      <table className="shoppingCart">
        <tbody>
          {cart.map(({
            thumbnail, title, quantity, price, id,
          }) => (
            <tr key={id}>
              <td><img src={thumbnail} alt="imagem do produto" /></td>
              <td>{title}</td>
              <td>{quantity}</td>
              <td>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>
        Total:
        {totalPrice}
      </h2>
    </div>
  );
}

export default ReviewCart;
