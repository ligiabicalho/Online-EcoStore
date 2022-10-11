if (!JSON.parse(localStorage.getItem('shopping_cart'))) {
  localStorage.setItem('shopping_cart', JSON.stringify([]));
}
const readShoppingCart = () => JSON.parse(localStorage.getItem('shopping_cart'));

const saveShoppingCart = (shoppingCart) => localStorage
  .setItem('shopping_cart', JSON.stringify(shoppingCart));

export const getShoppingCart = () => {
  const shoppingCart = readShoppingCart();
  return shoppingCart;
};

export const addProduct = (product) => {
  if (product) {
    const shoppingCart = readShoppingCart();
    saveShoppingCart([...shoppingCart, product]);
  }
};

export const removeProduct = (product) => {
  const shoppingCart = readShoppingCart();
  saveShoppingCart(shoppingCart.filter((p) => p.id !== product.id));
};
