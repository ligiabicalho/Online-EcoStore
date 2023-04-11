import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/CardProduct.css';
import ButtonAddCart from './ButtonAddCart';

class CardProduct extends React.Component {
  render() {
    const { title, thumbnail, price, shipping,
      handleAddCart, dataTestId, linkDetails, id, attributes } = this.props;
    return (
      <div className="card-product">
        <p data-testid="product-detail-name">{ title }</p>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <p>
          R$
          <span data-testid="product-detail-price">{price}</span>
        </p>
        {shipping && <p data-testid="free-shipping">Frete gratis!</p>}
        {linkDetails
          ? (
            <Link
              data-testid="product-detail-link"
              to={ `/details/${id}` }
            >
              Detalhes
            </Link>
          )
          : (
            <p>
              {attributes?.some((att) => att.id === 'BRAND')
              && `Marca: ${attributes?.find((att) => att.id === 'BRAND').value_name}`}
              {attributes?.some((att) => att.id === 'AUTHOR')
              && `Autor: 
            ${attributes?.find((att) => att.id === 'AUTHOR').value_name}`}
            </p>
          )}
        {handleAddCart
        && <ButtonAddCart
          handleAddCart={ handleAddCart }
          dataTestId={ dataTestId }
        />}
      </div>
    );
  }
}

CardProduct.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.string,
  shipping: PropTypes.bool,
  handleAddCart: PropTypes.func,
  dataTestId: PropTypes.string,
  linkDetails: PropTypes.bool,
  attributes: PropTypes.array,
}.isRequired;

export default CardProduct;
