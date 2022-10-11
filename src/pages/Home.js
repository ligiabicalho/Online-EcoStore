import React from 'react';
import { Link } from 'react-router-dom';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    listCategories: [],
    shoppingCart: [],
  };

  componentDidMount() {
    this.handleGetCategories();
  }

  handleGetCategories = async () => {
    const listCategories = await getCategories();
    this.setState({
      listCategories,
    });
  };

  handleSearchChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  onSearchClick = async () => {
    const { search } = this.state;
    if (search) { // Se algo for pesquisado (search = true), faz a requisição do termo.
      const request = await getProductsFromCategoryAndQuery(undefined, search);
      const { results } = request;
      this.setState({
        results,
      });
    }
  };

  handleAddCart = ({ target }) => {
    const { value } = target;
    // const { shoppingCart } = this.state;
    this.setState((prevState) => ({
      shoppingCart: [...prevState.shoppingCart, value],
    }), () => this.addCartLocalStorage());
  };

  saveShoppingCart = (shoppingCart) => localStorage
    .setItem('shopping_cart', JSON.stringify(shoppingCart));

  addCartLocalStorage = () => {
    const { shoppingCart } = this.state;
    // if (!JSON.parse(localStorage.getItem('shopping_cart'))) {
    //   localStorage.setItem('shopping_cart', JSON.stringify([]));
    // }
    // const readShoppingCart = () => JSON.parse(localStorage.getItem('shopping_cart'));
    // const productsShoppingCart = readShoppingCart();
    this.saveShoppingCart(shoppingCart);
  };

  onClickCategory = async ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
    const request = await getProductsFromCategoryAndQuery(value);
    const { results } = request;
    this.setState({
      results,
    });
  };

  render() {
    const { listCategories, results } = this.state;
    return (
      <>
        <label htmlFor="search">
          <input
            data-testid="query-input"
            type="text"
            id="search"
            name="search"
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
          {listCategories.map((category) => (
            <li key={ category.id }>
              <label htmlFor={ category.id }>
                <input
                  id={ category.id }
                  value={ category.id }
                  name="category"
                  type="radio"
                  data-testid="category"
                  onClick={ this.onClickCategory }
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
                    <Link
                      data-testid="product-detail-link"
                      to={ `/details/${result.id}` }
                    >
                      <button
                        data-testid="shopping-cart-button"
                        type="button"
                      >
                        Detalhes
                      </button>
                    </Link>
                    <button
                      type="button"
                      name="shoppingCart"
                      value={ result.id }
                      data-testid="product-add-to-cart"
                      onClick={ this.handleAddCart }
                    >
                      Adicionar ao carrinho
                    </button>
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
