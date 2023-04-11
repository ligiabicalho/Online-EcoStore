import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CardProduct from '../components/CardProduct';
import Header from '../components/Header';
import { addProduct, getShoppingCart, saveShoppingCart } from '../services/localstorage';
import '../styles/Home.css';

class Home extends React.Component {
  state = {
    listCategories: [],
    shoppingCart: [],
  };

  componentDidMount() {
    this.handleGetCategories();
    this.handleGetShoppingCart();
  }

  handleGetCategories = async () => {
    const listCategories = await getCategories();
    this.setState({
      listCategories,
    });
  };

  handleGetShoppingCart = () => {
    const shoppingCart = getShoppingCart();
    this.setState({
      shoppingCart,
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
    if (search) {
      const request = await getProductsFromCategoryAndQuery(undefined, search);
      const { results } = request;
      console.log(results);
      this.setState({
        results,
      });
    }
  };

  handleAddCart = (result) => {
    const shoppingCart = getShoppingCart();
    const findProduct = shoppingCart.find((product) => product.id === result.id); // Se ja estiver no carrinho, retorna o produto/true.
    if (!findProduct) {
      result.quantity = 1;
      addProduct(result);
    }
    if (findProduct) {
      findProduct.quantity += 1;
      saveShoppingCart(shoppingCart);
    }
    this.setState({
      shoppingCart: getShoppingCart(),
    });
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
    const { listCategories, results, shoppingCart, search } = this.state;
    return (
      <>
        <Header shoppingCart={ shoppingCart } />
        <div className="search">
          <label htmlFor="search">
            <input
              className="search-input"
              data-testid="query-input"
              type="search"
              id="search"
              name="search"
              placeholder="Pesquise por qualquer termo"
              onChange={ this.handleSearchChange }
            />
            <button
              className="search-btn"
              type="button"
              data-testid="query-button"
              onClick={ this.onSearchClick }
            >
              Pesquisar
            </button>
          </label>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        <div className="container">
          <aside>
            <div className="categories-list">
              {listCategories.map((category) => (
                <label
                  htmlFor={ category.id }
                  key={ category.id }
                >
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
              ))}
            </div>
          </aside>
          <section className="result-content">
            {results?.length === 0
              && <p className="no-result">Nenhum produto foi encontrado</p>}
            <ul className="products-list">
              {results?.map((result) => (
                <li
                  key={ result.id }
                  data-testid="product"
                >
                  <CardProduct
                    title={ result.title }
                    thumbnail={ result.thumbnail }
                    price={ result.price }
                    id={ result.id }
                    shipping={ result.shipping.free_shipping }
                    dataTestId="product-add-to-cart"
                    linkDetails
                    handleAddCart={ () => this.handleAddCart(result) }
                  />
                </li>))}
            </ul>
          </section>
        </div>
      </>

    );
  }
}

export default Home;
