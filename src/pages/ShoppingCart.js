import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
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
        <Header shoppingCart={ shoppingCart } />
        { (shoppingCart?.length > 0) // a interrogação valida se não é undefined, evitando que o código quebre.
          ? (
            <>
              <ul>
                {shoppingCart.map((product, i) => (
                  <li
                    key={ i }
                    className="product-card-shopping-cart"
                    data-testid="shopping-cart-product-name"
                  >
                    <CardProduct
                      title={ product.title }
                      thumbnail={ product.thumbnail }
                      price={ product.price * product.quantity }
                      id={ product.id }
                      attributes={ product.attributes }
                    />
                    <div className="quantity-btns">

                      <button
                        className="increase-btn"
                        name="increase"
                        id={ product.id }
                        type="button"
                        data-testid="product-increase-quantity"
                        disabled={
                          (product.quantity === product.available_quantity)
                        }
                        onClick={ this.handleQuantity }
                      >
                        +
                      </button>
                      <span
                        className="product-quantity"
                        data-testid="shopping-cart-product-quantity"
                      >
                        { product.quantity }
                      </span>
                      <button
                        className="decrease-btn"
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
                      <br />
                    </div>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => this.handleRemoveProduct(product) }
                    >
                      Remover Produto
                    </button>
                  </li>))}
              </ul>
              <Link to="/checkout">
                <button
                  data-testid="checkout-products"
                  type="button"
                >
                  Finalizar compra
                </button>
              </Link>
            </>
          )
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}

export default ShoppingCart;
