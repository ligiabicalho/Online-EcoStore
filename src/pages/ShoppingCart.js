import React from 'react';
import CardProduct from '../components/CardProduct';
import { getShoppingCart } from '../services/localstorage';

class ShoppingCart extends React.Component {
  state = {
    shoppingCart: [],
  };

  componentDidMount() {
    this.handleGetShoppingCart();
  }

  handleGetShoppingCart = () => {
    const shoppingCart = getShoppingCart();
    // console.log(shoppingCart);
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
                    title={ product.title }
                    thumbnail={ product.thumbnail }
                    price={ product.price }
                    id={ product.id }
                    value={ product }
                    attributes={ product.attributes }
                    // handleAddCart={ handleAddCart }
                  />
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
