const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const itemsSection = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  itemsSection.appendChild(section);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const array = [];
let total = 0;

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  array.push(salePrice);
  total = array.reduce((acc, current) => acc + current, 0);
  totalPrice.innerHTML = total;
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  cartItems.appendChild(li);
  return li;
}

function cartItemClickListener() {
  const button = document.querySelectorAll('.item__add');
  button.forEach((btn) =>
    btn.addEventListener('click', async ({ target }) => {
      const nome = getSkuFromProductItem(target.parentNode);
      const result = await fetchItem(nome);
      const li = createCartItemElement(result);
      ol.appendChild(li);
      saveCartItems(ol.innerHTML);
    }));
}

function removeElement() {
  cartItems.addEventListener('click', (event) => {
    if (event.target.matches('.cart__item')) {
      const sub = event.target.innerText.split('$');
      total -= Number(sub[1]);
      totalPrice.innerHTML = total;
      cartItems.removeChild(event.target);
      saveCartItems(cartItems.innerHTML);
    }
  });
}

function emptyCart() {
  const empty = document.querySelector('.empty-cart');
  empty.addEventListener('click', () => {
    cartItems.innerHTML = '';
    total = 0;
    totalPrice.innerHTML = total;
  });
}

function getFromLocalStorage() {  
  const recoveredData = getSavedCartItems();
  cartItems.innerHTML = recoveredData;
  const listItems = document.querySelectorAll('li');
  listItems.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
  } 

function loading() {
  const newElement = document.createElement('p');
  newElement.className = 'loading';
  document.body.append(newElement);
  newElement.innerHTML = 'carregando...';
  setTimeout(() => {
    document.body.removeChild(newElement);
  }, 2000);
}

const destructionFetchProducts = async (item) => {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
  const data = await result.json();
  const objArray = data.results.map((e) => ({ name: e.title, image: e.thumbnail, sku: e.id }));
  return objArray;
};

window.onload = async () => {
  const idApi = await destructionFetchProducts('computador');
  idApi.forEach((item) => createProductItemElement(item));
  cartItemClickListener();
  removeElement();
  emptyCart();
  loading();
  getFromLocalStorage();
};