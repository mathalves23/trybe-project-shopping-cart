const ol = document.querySelector('.cart__items');

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

const totalPrice = document.querySelector('.total-price');
const array = [];
let total = 0;
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  array.push(salePrice);
  total = array.reduce((acc, current) => acc + current);
  totalPrice.innerHTML = total;

  const olShoppingCart = document.querySelector('.cart');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  olShoppingCart.appendChild(li);
  return li;
}

const cartItemClickListener = () => {
  const button = document.querySelectorAll('.item__add');
  button.forEach((btn) => btn.addEventListener('click', async ({ target }) => {
      const nome = getSkuFromProductItem(target.parentNode);
      const result = await fetchItem(nome);
      const li = createCartItemElement(result);
      ol.appendChild(li);
      saveCartItems(ol.innerHTML);
    }));
};

function removeElement() {
  ol.addEventListener('click', (event) => {
    if (event.target.matches('.cart__item')) {
      const sub = event.target.innerText.split('$');
      total -= Number(sub[1]);
      totalTxt.innerHTML = total;
      ol.removeChild(event.target);
      saveCartItems(ol.innerHTML);
    }
  });
}

function emptyCart() {
  const clean = document.querySelector('.empty-cart');
  clean.addEventListener('click', () => {
    ol.innerHTML = '';
  });
}

const getLocalStorage = () => {
  const saveLocalStorage = getSavedCartItems();
  ol.innerHTML = saveLocalStorage;
};

const removeLoading = () => {
  const newElement = document.createElement('p');
  newElement.className = 'loading';
  document.body.append(newElement);
  newElement.innerHTML = 'carregando...';
  setTimeout(() => {
    document.body.removeChild(newElement);
  }, 2000);
};

const destructionFetchProducts = async (item) => {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
  const data = await result.json();
  const object = data.results.map((e) => ({ name: e.title, image: e.thumbnail, sku: e.id }));
  return object;
};

window.onload = async () => { 
  const api = await destructionFetchProducts('computador');
  api.forEach((item) => createProductItemElement(item));
  cartItemClickListener();
  removeElement();
  emptyCart();
  removeLoading();
  getLocalStorage();
};