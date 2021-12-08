const fetchProducts = (product) => {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const api = fetch(endpoint)
    .then((promise) => promise.json())
    .then((value) => value)
    .catch((error) => error);
    return api;
};

if (typeof module !== 'undefined') {
 module.exports = {
   fetchProducts,
 };
}