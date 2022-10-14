import React from 'react';
import { Link } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import { getShoppingCart } from '../services/localstorage';

class Checkout extends React.Component {
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

  render() {
    const { shoppingCart } = this.state;
    return (
      <>
        <p>Revise seus produtos</p>
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
                price={ Number(product.price) * product.quantity }
                id={ product.id }
              />
              <p>
                { `Quantidade: ${product.quantity}` }
              </p>
            </li>))}
        </ul>
        <p>Total</p>
        {shoppingCart.reduce((acc, curr) => {
          acc += Number(curr.price) * curr.quantity;
          return Number(acc);
        }, [])}
        <br />
        <label htmlFor="full-name">
          Nome completo
          <input
            id="full-name"
            type="text"
            data-testid="checkout-fullname"
            required
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            data-testid="checkout-email"
            required
          />
        </label>
        <label htmlFor="document-cpf">
          CPF
          <input
            id="document-cpf"
            type="number"
            data-testid="checkout-cpf"
            required
          />
        </label>
        <label htmlFor="full-name">
          Telefone
          <input
            id="phone"
            type="number"
            data-testid="checkout-phone"
            required
          />
        </label>
        <label htmlFor="cep">
          CEP
          <input
            id="cep"
            type="number"
            data-testid="checkout-cep"
            required
          />
        </label>
        <label htmlFor="address">
          Endereço
          <input
            id="address"
            type="text"
            data-testid="checkout-address"
            required
          />
        </label>
        <fieldset>
          <legend>Método de pagamento</legend>
          <label htmlFor="ticket">
            <input
              id="ticket"
              name="payment"
              type="radio"
              data-testid="ticket-payment"
            />
            Boleto
          </label>
          <label htmlFor="visa">
            <input
              id="visa"
              name="payment"
              type="radio"
              data-testid="visa-payment"
            />
            Visa
          </label>
          <label htmlFor="master">
            <input
              id="master"
              name="payment"
              type="radio"
              data-testid="master-payment"
            />
            Mastercard
          </label>
          <label htmlFor="elo">
            <input
              id="elo"
              name="payment"
              type="radio"
              data-testid="elo-payment"
            />
            Elo
          </label>
        </fieldset>
        <Link
          to="/"
        >
          <button
            data-testid="checkout-btn"
            type="button"
            onClick={ () => localStorage.setItem('shopping_cart', JSON.stringify([])) }
          >
            Comprar
          </button>
        </Link>
      </>
    );
  }
}

export default Checkout;
