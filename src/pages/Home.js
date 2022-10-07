import React from 'react';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
import { getCategories } from '../services/api';

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

  render() {
    const { categories } = this.state;
    return (
      <>
        <label htmlFor="search">
          <input type="text" id="search" />
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <ButtonShoppingCart />
        </label>
        <div>
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
        </div>
      </>

    );
  }
}

export default Home;
