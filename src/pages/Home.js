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
    results: [],
    categoryId: undefined,
    search: undefined,
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
    const { search, categoryId } = this.state;
    const request = await getProductsFromCategoryAndQuery(categoryId, search);
    const { results } = request;
    this.setState({
      results,
    });
  };

  handleAddCart = (product) => {
    const shoppingCart = getShoppingCart();
    const findProduct = shoppingCart.find((cartProduct) => cartProduct.id === product.id); // Se ja estiver no carrinho, retorna o produto/true.
    if (!findProduct) {
      product.quantity = 1;
      addProduct(product);
    }
    if (findProduct) {
      findProduct.quantity += 1;
      saveShoppingCart(shoppingCart);
    }
    this.setState({
      shoppingCart: getShoppingCart(),
    });
  };

  onClickCategory = async ({ target: { value, name } }) => {
    this.setState({ [name]: value });

    const { search } = this.state;
    const request = await getProductsFromCategoryAndQuery(value, search);
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
              value={ search }
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
          <aside className="categories-list">
            <label
              htmlFor="clearCategory"
            >
              <input
                data-testid="category"
                id="clearCategory"
                name="categoryId"
                value=""
                type="radio"
                onClick={ this.onClickCategory }
              />
              Limpar categorias
            </label>
            {listCategories.map((category) => (
              <label
                htmlFor={ category.id }
                key={ category.id }
              >
                <input
                  data-testid="category"
                  id={ category.id }
                  name="categoryId"
                  value={ category.id }
                  type="radio"
                  onClick={ this.onClickCategory }
                />
                {category.name}
              </label>
            ))}
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
