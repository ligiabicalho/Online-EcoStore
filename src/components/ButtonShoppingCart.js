import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ShoppingCart.css';
// import { getShoppingCart } from '../services/localstorage';

class ButtonShoppingCart extends React.Component {
  render() {
    return (
      <Link
        className="link-shopping-cart"
        data-testid="shopping-cart-button"
        to="/shopping-cart"
      >
        <span className="material-symbols-outlined">
          shopping_cart
        </span>
      </Link>
    );
  }
}

export default ButtonShoppingCart;
