import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Details from '../pages/Details';
// import { getProductById } from '../services/api';

class CardProduct extends React.Component {
  render() {
    const { title, thumbnail, price, id, value, handleAddCart } = this.props;
    return (
      <div className="card-product">
        <p data-testid="product-detail-name">{ title }</p>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <p data-testid="product-detail-price">
          { price }
        </p>
        <Link // Colocar uma renderização condicional?
          data-testid="product-detail-link"
          to={ `/details/${id}` }
        >
          Detalhes
        </Link>
        <br />
        <button
          type="button"
          name="addCart"
          value={ value }
          data-testid="product-add-to-cart"
          onClick={ handleAddCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

CardProduct.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.object,
  // attributes: PropTypes.arrayOf,
  // match: PropTypes.shape({
  //   params: PropTypes.shape({
  //     id: PropTypes.string,
  //   }),
  // }),
}.isRequired;

export default CardProduct;
