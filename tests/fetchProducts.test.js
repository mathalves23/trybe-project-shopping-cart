require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

 describe('1 - Teste a função fecthProducts', () => {
  it('se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  it('se teste foi chamada quando executada a função fetchProducts com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', () => {
   fetchProducts('computador');
   const ENDPOINT = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
   expect(fetch).toHaveBeenCalledWith(ENDPOINT)
  })
  it('se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const apiObject = await fetchProducts('computador');
    expect(apiObject).toEqual(computadorSearch);
  })
  it('se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const error = new Error('You must provide an url');
    expect(await fetchProducts()).toEqual(error);
  })
 });