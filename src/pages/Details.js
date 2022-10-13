import React from 'react';
import PropTypes from 'prop-types';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
import { getProductById } from '../services/api';
import CardProduct from '../components/CardProduct';
import { addProduct, getShoppingCart, removeProduct } from '../services/localstorage';
import '../styles/Details.css';

class Details extends React.Component {
  state = {
    result: {},
    email: '',
    text: '',
    rating: 0,
  };

  componentDidMount() {
    this.renderProduct();
  }

  renderProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getProductById(id);
    this.setState({
      result: request,
    });
  };

  handleAddCart = (result) => {
    const shoppingCart = getShoppingCart(); // retorna array de objetos
    const findProduct = shoppingCart.some((product) => product.id === result.id); // Se ja estiver no carrinho, retorna o produto/true.
    console.log(findProduct);
    if (!findProduct) {
      result.quantity = 1;
      addProduct(result);
    }
    if (findProduct) { // true: altera quantity
      removeProduct(result);
      result.quantity += 1;
      addProduct(result);
    }
  };

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validationInputs = () => {
    const { email, text, rating } = this.state;
    const validEmail = email.length > 0;
    const validText = text.length > 0;
    const validRating = rating > 0;
    if (validEmail && validText && validRating) {
      this.setState({
        validation: true,
      });
    } else {
      this.setState({
        validation: false,
      });
    }
  };

  render() {
    const { result, validation, email, text, rating } = this.state;
    return (
      <div>
        <CardProduct
          dataTestId="product-detail-add-to-cart"
          title={ result.title }
          thumbnail={ result.thumbnail }
          price={ result.price }
          id={ result.id }
          handleAddCart={ () => this.handleAddCart(result) }
        />
        <ButtonShoppingCart />
        <form>
          <label htmlFor="email" data-testid="product-detail-email">
            Digite seu e-mail:
            <input
              id="email"
              type="email"
              name="email"
              placeholder="digite seu e-mail"
              onChange={ this.handleOnChange }
            />
          </label>
          <br />
          <div className="rating">
            <label htmlFor="one" data-testid="1-rating">
              <input
                id="one"
                type="radio"
                name="rating"
                value="1"
                onChange={ this.handleOnChange }
              />
              <span className="icon">★</span>
            </label>
            <label htmlFor="two" data-testid="2-rating">
              <input
                id="two"
                type="radio"
                name="rating"
                value="2"
                onChange={ this.handleOnChange }
              />
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label htmlFor="three" data-testid="3-rating">
              <input
                id="three"
                type="radio"
                name="rating"
                value="3"
                onChange={ this.handleOnChange }
              />
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label htmlFor="four" data-testid="4-rating">
              <input
                id="four"
                type="radio"
                name="rating"
                value="4"
                onChange={ this.handleOnChange }
              />
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label htmlFor="five" data-testid="5-rating">
              <input
                id="five"
                type="radio"
                name="rating"
                value="5"
                onChange={ this.handleOnChange }
              />
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
          </div>
          <br />
          <label htmlFor="evaluation" data-testid="product-detail-evaluation">
            Dê a sua avaliação sobre o produto:
            <input
              id="evaluation"
              type="textarea"
              name="text"
              placeholder="digite sua avaliação"
              onChange={ this.handleOnChange }
            />
          </label>
          <br />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.validationInputs }
          >
            Enviar
          </button>
          {validation
            ? (
              <>
                <p data-testid="review-card-email">{email}</p>
                <p data-testid="review-card-evaluation">{text}</p>
                <p data-testid="review-card-rating">{rating}</p>
              </>)
            : <p data-testid="error-msg">Campos inválidos</p>}
        </form>
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Details;
