import React from 'react';
import { Link } from 'react-router-dom';

class ButtonShoppingCart extends React.Component {
  render() {
    return (
      <Link
        data-testid="shopping-cart-button"
        to="/shopping-cart"
      >
        <button type="button">Carrinho de compras</button>
      </Link>

    );
  }
}

export default ButtonShoppingCart;
