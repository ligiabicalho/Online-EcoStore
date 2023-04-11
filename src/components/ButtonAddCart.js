import React from 'react';
import PropTypes from 'prop-types';

class ButtonAddCart extends React.Component {
  render() {
    const { handleAddCart, dataTestId } = this.props;
    return (
      <button
        className="addCart"
        type="button"
        name="addCart"
        data-testid={ dataTestId }
        onClick={ handleAddCart }
      >
        Adicionar ao carrinho
      </button>
    );
  }
}
ButtonAddCart.propTypes = {
  handleAddCart: PropTypes.func,
  dataTestId: PropTypes.string,
}.isRequired;

export default ButtonAddCart;
