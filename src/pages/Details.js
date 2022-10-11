import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
// import { handleAddCart } from './Home';
import { getProductById } from '../services/api';
import CardProduct from '../components/CardProduct';

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

  render() {
    const { result } = this.state;
    return (
      <div>
        <CardProduct
          title={ result.title }
          thumbnail={ result.thumbnail }
          price={ result.price }
          id={ result.id }
          value={ result }
          // attributes={ result.attributes }
          handleAddCart={ this.handleAddCart }
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
