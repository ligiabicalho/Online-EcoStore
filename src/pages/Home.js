import React from 'react';
import ButtonShoppingCart from '../components/ButtonShoppingCart';

class Home extends React.Component {
  render() {
    return (
      <label htmlFor="search">
        <input type="text" id="search" />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <ButtonShoppingCart />
      </label>
    );
  }
}

export default Home;
