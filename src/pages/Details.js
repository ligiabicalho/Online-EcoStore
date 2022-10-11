import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
// import { handleAddCart } from './Home';
import { getProductById } from '../services/api';
import CardProduct from '../components/CardProduct';
import { addProduct } from '../services/localstorage';

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
    addProduct(result); // Add Local Storage
    // this.handleGetShoppingCart(); // Após add, chama a função p/ receber a lista do Cart e add no state.
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
          value={ result }
          // attributes={ result.attributes }
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
