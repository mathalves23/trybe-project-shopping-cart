const fetchProducts = (product) => {
  const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const api = fetch(ENDPOINT)
    .then((promise) => promise.json())
    .then((values) => values)
    .catch((error) => error);
    return api;
};

if (typeof module !== 'undefined') {
 module.exports = {
   fetchProducts,
 };
}