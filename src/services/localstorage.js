if (!JSON.parse(localStorage.getItem('shopping_cart'))) {
  localStorage.setItem('shopping_cart', JSON.stringify([]));
}
const readShoppingCart = () => JSON.parse(localStorage.getItem('shopping_cart'));

export const saveShoppingCart = (shoppingCart) => localStorage
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

const readEvaluationList = (productId) => JSON.parse(localStorage.getItem(productId));
const saveEvaluationList = (productId, evaluationList) => localStorage
  .setItem(productId, JSON.stringify(evaluationList));

export const addEvaluation = (productId, evaluation) => {
  if (!JSON.parse(localStorage.getItem(productId))) {
    localStorage.setItem(productId, JSON.stringify([]));
  }
  if (evaluation) {
    const evaluationList = readEvaluationList(productId);
    saveEvaluationList(productId, [...evaluationList, evaluation]);
  }
};

export const getEvaluationList = (productId) => {
  const evaluationList = readEvaluationList(productId);
  return evaluationList;
};
