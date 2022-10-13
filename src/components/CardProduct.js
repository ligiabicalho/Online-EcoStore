import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProduct extends React.Component {
  render() {
    const { title, thumbnail, price, id, value,
      handleAddCart, dataTestId } = this.props;
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
        { (dataTestId === 'product-add-to-cart')
        && (
          <Link
            data-testid="product-detail-link"
            to={ `/details/${id}` }
          >
            Detalhes
          </Link>
        )}
        <button
          type="button"
          name="addCart"
          value={ value }
          data-testid={ dataTestId }
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
  dataTestId: PropTypes.string,
}.isRequired;

export default CardProduct;
