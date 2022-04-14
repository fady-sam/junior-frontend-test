import reducer from "./reducer";
import { createStore } from "redux";
import { loadState } from "./localStorage";

// const initialStore = {
//   cart: [],
//   total: 0,
//   amount: 0,
// };

// const persistedState = loadState() || initialStore;

// export const store = createStore(reducer, persistedState);

const persistedState = loadState();

const initialStore = {
  cart: [],
  total: 0,
  amount: 0,
  currency: null,
  ...persistedState,
};

export const store = createStore(reducer, initialStore);
