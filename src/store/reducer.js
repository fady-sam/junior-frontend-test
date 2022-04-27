import {
  SET_CURRENCY,
  INCREASE,
  DECREASE,
  REMOVE,
  CLEAR_CART,
  GET_TOTALS,
} from "./actions";

function reducer(state, action) {
  let cart = [...state.cart];

  if (action.type === SET_CURRENCY) {
    return {
      ...state,
      cart: state.cart.map((item) => {
        item.price = getPrice(item.prices, action.payload);
        return item;
      }),
      currency: action.payload,
    };
  }

  if (action.type === DECREASE) {
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (item.amount === 0) {
            return item;
          } else {
            item.amount--;
          }
        }
        return item;
      }),
    };
  }

  if (action.type === INCREASE) {
    const increasePrice = getPrice(action.payload.prices, state.currency);

    if (!cart || cart.length === 0) {
      action.payload.price = increasePrice;
      cart.push(action.payload);
    } else {
      let increaseItem = cart.findIndex(
        (item) =>
          item.id === action.payload.id &&
          equals(item.selectedAttributes, action.payload.selectedAttributes)
      );
      if (increaseItem !== -1) {
        cart[increaseItem].amount++;
      } else {
        action.payload.price = increasePrice;
        cart.push(action.payload);
      }
    }

    return {
      ...state,
      cart,
    };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload.id),
    };
  }
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        cartTotal.amount += amount;
        cartTotal.total += amount * price;
        return cartTotal;
      },
      { amount: 0, total: 0 }
    );
    return { ...state, total, amount };
  }
  return state;
}

const equals = (a, b) => {
  if (a === b) return true;
  if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
    return a === b;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((k) => equals(a[k], b[k]));
};

const getPrice = (prices, currency) => {
  return prices.find((price) => price.currency.label === currency.label).amount;
};

export default reducer;
