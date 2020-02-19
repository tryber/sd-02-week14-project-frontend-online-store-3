import PropTypes from 'prop-types';
import React, { Component } from 'react';

function ReviewCart (props){
  const { cart, totalPrice } = props
  return (
    <div className="review-cart">
      <h2>Revise seus Produtos</h2>
      <table className="shoppingCart">
        <tbody>
          {cart.map(({ thumbnail, title, quantity, price, id }) => {
            return (
              <tr key={id}>
                <td><img src={thumbnail} /></td>
                <td>{title}</td>
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

export default ReviewCart
