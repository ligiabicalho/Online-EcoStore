import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getCategories } from './services/api';

// Iniciando o projeto group-3-release

class App extends React.Component {
  render() {
    console.log(getCategories());
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>Edit src/App.js and save to reload.</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
