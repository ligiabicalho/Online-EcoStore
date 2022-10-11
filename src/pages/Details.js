import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
// import { handleAddCart } from './Home';
import { getProductById } from '../services/api';
import CardProduct from '../components/CardProduct';
import { addProduct, getShoppingCart, removeProduct } from '../services/localstorage';

class Details extends React.Component {
  state = {
    result: {},
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
      console.log('Primeiro if');
      addProduct(result);
    }
    if (findProduct) { // true: altera quantity
      console.log('Segundo if');
      removeProduct(result);
      result.quantity += 1;
      addProduct(result);
    }
  };

  render() {
    const { result } = this.state;
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
