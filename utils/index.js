/* eslint-disable camelcase */
// Function that gets you the decimals valiue
const getDecimals = value => value.toString().split(".")[1] || 0;

// Function that translates condition to spanish
const translateCondition = condition => {
  switch(condition) {
    case 'new':
      return 'Nuevo'
    case 'used':
      return 'Usado'
    default:
      return condition;
  }
}

// Parse Items to match requested data
const parseItem = (item) => {
  // Destructuring
  const { currency_id, price, thumbnail, shipping, address, condition } = item;

  return Object.assign({
    ...item,
    author: {
      name: "Bruno",
      lastname: "Digonzelli"
    },
    price: {
      currency: currency_id,
      amount: price,
      decimals: getDecimals(price)
    },
    picture: thumbnail,
    free_shipping: shipping.free_shipping,
    address: address ? address.state_name : null,
    condition: translateCondition(condition)
  });
};

// Parse full response (items + categories) to match requested data
const parseFullResponse = (items, categories) => {
  return {
    categories: categories
      ? categories.values[0].path_from_root.map(category => category.name)
      : [],
    items: items.slice(0, 4).map(item => parseItem(item))
  };
};

module.exports = { parseItem, parseFullResponse };