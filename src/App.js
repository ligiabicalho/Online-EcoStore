import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/shopping-cart" component={ ShoppingCart } />
          <Route exact path="/" component={ Home } />
          <Route path="/details/:id" component={ Details } />
          <Route path="/checkout" component={ Checkout } />
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
