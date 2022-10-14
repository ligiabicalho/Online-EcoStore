import React from 'react';
import PropTypes from 'prop-types';

class CardProduct extends React.Component {
  render() {
    const { title, thumbnail, price } = this.props;
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
      </div>
    );
  }
}

CardProduct.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default CardProduct;
