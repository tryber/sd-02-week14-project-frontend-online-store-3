import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Checkout from './pages/Checkout';
// import SearchBar from './pages/SearchBar';
import ShoppingCart from './pages/ShoppingCart';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import './App.css';
// import ProductList from './components/ProductList';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Checkout} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/shopping_cart" component={ShoppingCart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
