// const button = document.querySelector('.empty-cart');

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

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(ol.innerHTML);
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btn = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  btn.addEventListener('click', async () => {
    const theItem = await fetchItem(sku);
    ol.appendChild(createCartItemElement(theItem));
    saveCartItems(ol.innerHTML);
  });
  section.appendChild(btn);
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function handleResults(results) {
  const itemms = document.querySelector('.items');
  results.forEach((product) => {
    itemms.appendChild(createProductItemElement(product));
  });
}

window.onload = () => {
  fetchProducts('computador').then((answer) => {
    const { results } = answer;
    handleResults(results);
    recoveringFromLocalStorage();
  });
};