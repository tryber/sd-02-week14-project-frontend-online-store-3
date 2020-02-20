import PropTypes from 'prop-types';
import React from 'react';

function ReviewCart(props) {
  const { cart, totalPrice } = props;
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

ReviewCart.propTypes = {
  cart: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    quantity: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  totalPrice: PropTypes.string.isRequired,
};

export default ReviewCart;
