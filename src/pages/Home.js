import React from 'react';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.handleGetCategories();
  }

  handleGetCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  };

  handleSearchChange = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
  };

  onSearchClick = async () => {
    const { search } = this.state;
    const request = await getProductsFromCategoryAndQuery(search);
    const { results } = request;
    this.setState({
      results,
    });
  };

  render() {
    const { categories, results } = this.state;
    return (
      <>
        <label htmlFor="search">
          <input
            data-testid="query-input"
            type="text"
            id="search"
            onChange={ this.handleSearchChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.onSearchClick }
          >
            Pesquisar
          </button>
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <ButtonShoppingCart />
        </label>
        <aside>
          {categories.map((category) => (
            <li key={ category.id }>
              <label htmlFor={ category.id }>
                <input
                  id={ category.id }
                  name="category"
                  type="radio"
                  data-testid="category"
                />
                {category.name}
              </label>
            </li>
          ))}
        </aside>
        <section className="result-content">
          { results !== undefined
            ? (
              <ul>
                {results.map((result) => (
                  <li
                    key={ result.id }
                    data-testid="product"
                  >
                    <p>{ result.title }</p>
                    <img src={ result.thumbnail } alt={ result.title } />
                    <p>
                      { result.price }
                    </p>
                  </li>))}
              </ul>
            )
            : <p>Nenhum produto foi encontrado</p>}
        </section>
      </>

    );
  }
}

export default Home;
