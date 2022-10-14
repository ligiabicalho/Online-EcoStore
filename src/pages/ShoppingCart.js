import React from 'react';
import CardProduct from '../components/CardProduct';
import { getShoppingCart, saveShoppingCart,
  removeProduct } from '../services/localstorage';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
    };
  }

  componentDidMount() {
    this.handleGetShoppingCart();
  }

  handleGetShoppingCart = () => {
    const shoppingCart = getShoppingCart();
    this.setState({
      shoppingCart,
    });
  };

  handleRemoveProduct = (product) => {
    removeProduct(product);
    this.handleGetShoppingCart();
  };

  handleQuantity = ({ target }) => {
    const shoppingCart = getShoppingCart();
    const { id, name } = target;
    const findProduct = shoppingCart.find((product) => product.id === id);
    if (name === 'increase') {
      findProduct.quantity += 1;
    }
    if (name === 'decrease') {
      findProduct.quantity -= 1;
    }
    saveShoppingCart(shoppingCart);
    this.setState({
      shoppingCart,
    });
  };

  render() {
    const { shoppingCart } = this.state;
    return (
      <div className="shopping-cart">
        { (shoppingCart.length > 0)
          ? (
            <ul>
              {shoppingCart.map((product, i) => (
                <li
                  key={ i }
                  data-testid="shopping-cart-product-name"
                >
                  <CardProduct
                    dataTestId="shopping-cart-product-quantity"
                    title={ product.title }
                    thumbnail={ product.thumbnail }
                    price={ product.price }
                    id={ product.id }
                  />
                  <button
                    name="increase"
                    id={ product.id }
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ this.handleQuantity }
                  >
                    +
                  </button>
                  <button
                    name="decrease"
                    id={ product.id }
                    type="button"
                    data-testid="product-decrease-quantity"
                    disabled={
                      (product.quantity === 1)
                    }
                    onClick={ this.handleQuantity }
                  >
                    -
                  </button>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={ () => this.handleRemoveProduct(product) }
                  >
                    Remover Produto
                  </button>
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    { product.quantity }
                  </p>
                </li>))}
            </ul>
          )
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>

    );
  }
}

export default ShoppingCart;
