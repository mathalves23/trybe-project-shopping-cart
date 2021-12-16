require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('se fetch foi chamada ao passar o argumento do item "MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })
  it('se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    const api = await fetchItem('MLB1615760527');
    expect(api).toEqual(item);
  })
  it('se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const error = new Error('You must provide an url');
    expect(await fetchItem()).toEqual(error);
  })
});
