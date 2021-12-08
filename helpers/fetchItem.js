const fetchItem = (specificId) => {
  const fetchItemEndpoint = `https://api.mercadolibre.com/items/${specificId}`;
  const fetchItemApi = fetch(fetchItemEndpoint)
  .then((promise) => promise.json())
  .then((values) => values)
  .catch((err) => err);
  return fetchItemApi;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
