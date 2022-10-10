import React from 'react';
import PropTypes from 'prop-types';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
import { getProductById } from '../services/api';

class Details extends React.Component {
  state = {
    results: {},
  };

  componentDidMount() {
    this.renderProduct();
  }

  renderProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getProductById(id);
    this.setState({
      results: request,
    });
  };

  render() {
    const { results } = this.state;
    // console.log(results);
    return (
      <div>
        <h1>Detalhes</h1>
        <ul>
          { results !== undefined && (
            <li
              key={ results.id }
              data-testid="product-detail-name"
            >
              <p>{ results.title }</p>
              <img
                data-testid="product-detail-image"
                src={ results.thumbnail }
                alt={ results.title }
              />
              <p data-testid="product-detail-price">
                { results.price }
              </p>
              <ButtonShoppingCart />
            </li>)}

        </ul>
      </div>
    );
  }
}
Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Details;
