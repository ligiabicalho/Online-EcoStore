import React from 'react';
import { Link } from 'react-router-dom';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CardProduct from '../components/CardProduct';
import { addProduct, getShoppingCart, saveShoppingCart } from '../services/localstorage';

class Home extends React.Component {
  state = {
    listCategories: [],
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
      this.setState({
        results,
      });
    }
  };

  handleAddCart = (result) => {
    const shoppingCart = getShoppingCart(); // retorna array de objetos
    const findProduct = shoppingCart.find((product) => product.id === result.id); // Se ja estiver no carrinho, retorna o produto/true.
    if (!findProduct) {
      result.quantity = 1;
      addProduct(result);
    }
    if (findProduct) { // true: altera quantity
      findProduct.quantity += 1;
      saveShoppingCart(shoppingCart);
    }
    this.setState({
      shoppingCart,
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
    const { listCategories, results } = this.state;
    return (
      <>
        <ButtonShoppingCart />
        {/* <span>
          {shoppingCart?.reduce((acc, curr) => {
            acc += curr.quantity;
            return Number(acc);
          }, 0)}
        </span> */}
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
                      title={ result.title }
                      thumbnail={ result.thumbnail }
                      price={ result.price }
                      id={ result.id }
                    />
                    <Link
                      data-testid="product-detail-link"
                      to={ `/details/${result.id}` }
                    >
                      Detalhes
                    </Link>
                    <button
                      type="button"
                      name="addCart"
                      data-testid="product-add-to-cart"
                      onClick={ () => this.handleAddCart(result) }
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
