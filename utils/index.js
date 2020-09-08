/* eslint-disable camelcase */
const countDecimals = value => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

// Parse Items to match requested data
const parseItem = (item) => {
  const { currency_id, price, thumbnail, shipping, address } = item;
  return Object.assign({
    author: {
      name: "Bruno",
      lastname: "Digonzelli"
    },
    ...item,
    price: {
      currency: currency_id,
      amount: price,
      decimals: countDecimals(price)
    },
    picture: thumbnail,
    free_shipping: shipping.free_shipping,
    address: address ? address.state_name : null
  }, item);
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