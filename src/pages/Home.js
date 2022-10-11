import React from 'react';
// import { Link } from 'react-router-dom';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CardProduct from '../components/CardProduct';
// import Details from './Details';
import { addProduct } from '../services/localstorage';

class Home extends React.Component {
  state = {
    listCategories: [],
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
    console.log(value);
    console.log(name);
    this.setState({
      [name]: value,
    });
  };

  onSearchClick = async () => {
    const { search } = this.state;
    const request = await getProductsFromCategoryAndQuery(undefined, search);
    const { results } = request;
    console.log(results);

    this.setState({
      results,
    });
  };

  // handleGetShoppingCart = () => {
  //   const shoppingCart = getShoppingCart();
  //   this.setState({
  //     shoppingCart,
  //   });
  // };

  handleAddCart = (result) => {
    addProduct(result); // Add Local Storage
    // this.handleGetShoppingCart(); // Após add, chama a função p/ receber a lista do Cart e add no state.
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
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
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
        </label>
        <br />
        <ButtonShoppingCart />
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
                    <CardProduct
                      dataTestId="product-add-to-cart"
                      title={ result.title }
                      thumbnail={ result.thumbnail }
                      price={ result.price }
                      id={ result.id }
                      handleAddCart={ () => this.handleAddCart(result) }
                    />
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
