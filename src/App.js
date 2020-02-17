import React from 'react';
import './App.css';
import * as ProductAPI from './Services/ProductAPI';

function App() {

  ProductAPI.getCategories()
  .then (categories => console.log(categories))

  ProductAPI.getQueryNCategorie('Motorola', 'MLB1055')
  .then (data => data.results.map(({title, thumbnail, price }) => console.log(title, thumbnail, price) ))

  return (
    <div>
      
    </div>
  );
}

export default App;
