import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReviewCart extends Component {

renderReviewCart() {
  const { cart } = this.state
  const { totalPrice } = this.state
  return (
    <div className="review-cart">
      <h2>Revise seus Produtos</h2>
      <table className="shoppingCart">
        <tbody>
          {cart.map(({ thumbnail, product, quantity, price }) => {
            return (
              <tr key={product}>
                <td><img src={thumbnail} /></td>
                <td>{product}</td>
                <td>{quantity}</td>
                <td>{price}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <h2>Total: {totalPrice} </h2>
    </div>
  )
}


render() {
  return()

}
}

export default ReviewCart
