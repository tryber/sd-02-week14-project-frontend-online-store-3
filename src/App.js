import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchBar from './pages/SearchBar';
import './App.css';
import ProductDetails from './pages/ProductDetails';
// import ProductList from './components/ProductList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SearchBar} />
          <Route path="/products/:id" component={ProductDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
