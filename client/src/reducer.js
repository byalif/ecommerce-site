import React from "react";

const Reducer = (state, action) => {
  if (action.type === "remove_all") {
    return { ...state, cart: [] };
  }
  if (action.type === "logout") {
    return { ...state, amount: 0, total: 0, cart: [] };
  }
  if (action.type === "Add") {
    return {
      ...state,
      cart: action.newCart,
      amount: action.newAmount,
      total: action.newTotal,
    };
  }
  if (action.type == "remove") {
    const newCart = state.cart.filter((x) => {
      return x != action.item;
    });
    let newTotal = state.total - action.item.price;
    newTotal = Number(newTotal.toFixed(2));
    return {
      ...state,
      cart: newCart,
      amount: state.amount - 1,
      total: newTotal,
    };
  }
  if (action.type === "set_amount") {
    return { ...action, amount: action.amt };
  }
  if (action.type == "set_total") {
    let ttl = Number(action.total);
    return { ...action, total: ttl };
  }
  if (action.type === "set_cart") {
    return {
      ...action,
      cart: action.cart,
      amount: action.amt,
      total: action.ttl,
    };
  }
  return state;
};

export default Reducer;
