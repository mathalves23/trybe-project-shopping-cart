const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    const arg = document.querySelector('.cart__items li');
    saveCartItems(arg);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
   const arg = document.querySelector('.cart__items li');
   saveCartItems(arg);
   expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', arg);
  });
 });

 