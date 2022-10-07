import React from 'react';

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
      </label>
    );
  }
}

export default Home;
