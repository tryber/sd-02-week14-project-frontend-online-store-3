import React from 'react';
import Checkout from './pages/Checkout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchBar from './pages/SearchBar';
import ShoppingCart from './pages/ShoppingCart';
import NotFound from './pages/NotFound';
import './App.css';
import ProductDetails from './pages/ProductDetails';
// import ProductList from './components/ProductList';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SearchBar} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/shopping_cart" component={ShoppingCart} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
