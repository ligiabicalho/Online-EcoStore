import React from 'react';
import CardProduct from '../components/CardProduct';
import { getShoppingCart, addProduct, removeProduct } from '../services/localstorage';

class ShoppingCart extends React.Component {
  state = {
    shoppingCart: [],
  };

  componentDidMount() {
    this.handleGetShoppingCart();
  }

  handleGetShoppingCart = () => {
    const shoppingCart = getShoppingCart();
    this.setState({
      shoppingCart,
    });
  };

  handleAddProduct = (product) => {
    addProduct(product);
    this.handleGetShoppingCart();
  };

  handleRemoveProduct = (product) => {
    removeProduct(product);
    this.handleGetShoppingCart();
  };

  render() {
    const { shoppingCart } = this.state;
    return (
      <div className="shopping-cart">
        { (shoppingCart.length > 0)
          ? (
            <ul>
              {shoppingCart.map((product, i) => (
                // (shoppingCart.filter((p) => p.id !== product.id
                <li
                  key={ i }
                  data-testid="shopping-cart-product-name"
                >
                  <CardProduct
                    title={ product.title }
                    thumbnail={ product.thumbnail }
                    price={ product.price }
                    id={ product.id }
                    // handleAddCart={ handleAddCart }
                  />
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => this.handleAddProduct(product) }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    disabled={
                      shoppingCart.filter((p) => p.id === product.id).length === 1
                    }
                    //onClick={ () =>  }
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
                    {shoppingCart.filter((p) => p.id === product.id).length}
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
