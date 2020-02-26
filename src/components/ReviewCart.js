import React from 'react';

function ReviewCart() {
  const cart = JSON.parse(localStorage.getItem('products'));
  const totalPrice = localStorage.getItem('totalPrice');
  if (cart === null) {
    return <h1>Carrinho vazio</h1>;
  }
  return (
    <div className="review-cart">
      <h3>Revise seus Produtos</h3>
      <table className="">
        <tbody>
          {cart.map(({
            thumbnail, title, quantity, price, id,
          }) => (
            <tr key={id}>
              <td><img src={thumbnail} alt="imagem do produto" /></td>
              <td>{title}</td>
              <td>
                <span>Qtd.</span>
                {quantity}
              </td>
              <td>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="price">
        {`Total da compra:    ${totalPrice}`}
      </h4>
    </div>
  );
}

export default ReviewCart;
