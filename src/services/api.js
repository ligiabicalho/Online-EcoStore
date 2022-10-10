export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId !== undefined && query !== undefined) {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  }
  if (categoryId !== undefined) {
    const endpointId = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const responseId = await fetch(endpointId);
    const dataId = await responseId.json();
    return dataId;
  }
  if (query !== undefined) {
    const endpointQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const responseQuery = await fetch(endpointQuery);
    const dataQuery = await responseQuery.json();
    return dataQuery;
  }
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
