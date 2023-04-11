import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import ButtonShoppingCart from './ButtonShoppingCart';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { shoppingCart } = this.props;
    return (
      <header>
        <Link to="/">
          <img className="logo" src={ logo } alt="Logomarca Online Shop" />
        </Link>
        <ButtonShoppingCart shoppingCart={ shoppingCart } />
      </header>
    );
  }
}

Header.propTypes = {
  shoppingCart: PropTypes.object,
}.isRequired;

export default Header;
