import React from 'react';
import { Redirect } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import { getShoppingCart } from '../services/localstorage';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      shoppingCart: [],
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      payment: '',
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

  handleOnChange = ({ target }) => {
    const { id, value, name, type } = target;
    if (type === 'radio') {
      this.setState({
        [name]: id,
      });
    }
    if (type !== 'radio') {
      this.setState({
        [id]: value,
      });
    }
  };

  validationCheckout = () => {
    const { name, email, cpf, phone, cep, address, payment } = this.state;

    const cpfNumber = 11;
    const cepNumber = 8;
    const minPhone = 8;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const validName = name.length > 0;
    const validCpf = cpf.length === cpfNumber;
    const validCep = cep.length === cepNumber;
    const validAddress = address.length > 0;
    const validPhone = phone.length >= minPhone;
    const validPayment = payment.length > 0;

    if (emailRegex.test(email)
      && validAddress
      && validName
      && validCep
      && validCpf
      && validPhone
      && validPayment) {
      this.setState({
        validation: true,
      }, () => localStorage.setItem('shopping_cart', JSON.stringify([])));
    } else {
      this.setState({
        validation: false,
      });
    }
  };

  render() {
    const { shoppingCart, validation } = this.state;
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
        <label htmlFor="name">
          Nome completo
          <input
            id="name"
            type="text"
            data-testid="checkout-fullname"
            onChange={ this.handleOnChange }
            required
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            data-testid="checkout-email"
            onChange={ this.handleOnChange }
            required
          />
        </label>
        <label htmlFor="cpf">
          CPF
          <input
            id="cpf"
            type="text"
            data-testid="checkout-cpf"
            onChange={ this.handleOnChange }
            required
          />
        </label>
        <label htmlFor="full-name">
          Telefone
          <input
            id="phone"
            type="text"
            data-testid="checkout-phone"
            onChange={ this.handleOnChange }
            required
          />
        </label>
        <label htmlFor="cep">
          CEP
          <input
            id="cep"
            type="text"
            data-testid="checkout-cep"
            onChange={ this.handleOnChange }
            required
          />
        </label>
        <label htmlFor="address">
          Endereço
          <input
            id="address"
            type="text"
            data-testid="checkout-address"
            onChange={ this.handleOnChange }
            placeholder="Nome da Rua, Bairro - Número"
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
              onChange={ this.handleOnChange }
            />
            Boleto
          </label>
          <label htmlFor="visa">
            <input
              id="visa"
              name="payment"
              type="radio"
              data-testid="visa-payment"
              onChange={ this.handleOnChange }
            />
            Visa
          </label>
          <label htmlFor="master">
            <input
              id="master"
              name="payment"
              type="radio"
              data-testid="master-payment"
              onChange={ this.handleOnChange }
            />
            Mastercard
          </label>
          <label htmlFor="elo">
            <input
              id="elo"
              name="payment"
              type="radio"
              data-testid="elo-payment"
              onChange={ this.handleOnChange }
            />
            Elo
          </label>
        </fieldset>
        <button
          data-testid="checkout-btn"
          type="button"
          onClick={ () => this.validationCheckout() }
        >
          Comprar
        </button>
        {validation
          ? <Redirect to="/" />
          : <p data-testid="error-msg">Campos inválidos</p>}
      </>
    );
  }
}

export default Checkout;
