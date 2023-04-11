import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ShoppingCart.css';
import PropTypes from 'prop-types';

class ButtonShoppingCart extends React.Component {
  render() {
    const { shoppingCart } = this.props;
    return (
      <Link
        className="link-shopping-cart"
        data-testid="shopping-cart-button"
        to="/shopping-cart"
      >
        <span className="material-symbols-outlined">
          shopping_cart
        </span>
        <span data-testid="shopping-cart-size" className="shopping-cart-size">
          {shoppingCart?.reduce((acc, curr) => {
            acc += curr.quantity;
            return Number(acc);
          }, 0)}
        </span>
      </Link>
    );
  }
}

ButtonShoppingCart.propTypes = {
  shoppingCart: PropTypes.array,
}.isRequired;

export default ButtonShoppingCart;
