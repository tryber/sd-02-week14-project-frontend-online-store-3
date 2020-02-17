
export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getCategorie(categorieId) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categorieId}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function getQuery(query) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function getQueryNCategorie(query, categorieId) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categorieId}&q=${query}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
