import React, { useReducer, useContext, useState } from "react";
import reducer from "./reducer.js";
// // import dotenv from "dotenv";
// dotenv.config();

const AppContext = React.createContext();

const initialState = {
  cart: [],
  total: 0,
  amount: 0,
};

export const AppProvider = ({ children }) => {
  // const val = process.env.REACT_APP_API_URL;
  // console.log(val);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [check, setCheck] = useState(false);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/Items`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.cart) {
          setCart(res.cart);
          console.log(res.cart);
          //   console.log(res.cart.amount);
          //   set_amt(res.cart.amount);
          setLoading(false);
        }
      })
      .catch(() => {
        console.log("er");
      });
  };

  const setCart = (cart) => {
    let amt = 0;
    let ttl = 0;
    cart.items.forEach((x) => {
      amt++;
      ttl = ttl + x.price;
    });
    ttl = Number(ttl.toFixed(2));
    dispatch({ type: "set_cart", cart: cart.items, amt, ttl });
  };

  const updateItems = (crt, amt, ttl) => {
    const obj = {
      items: crt,
      amount: amt,
      total: ttl,
    };

    fetch(`${process.env.REACT_APP_API_URL}/auth/addItems`, {
      body: JSON.stringify(obj),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((x) => {
        setUpdated(!updated);
        console.log(x);
        setIsDeleting(false);
      })
      .catch((err) => {
        console.log("error in front end");
      });
  };

  const removeAll = () => {
    if (localStorage.getItem("token")) {
      let cart = [];
      updateItems(cart, 0, 0);
    }
    dispatch({ type: "remove_all" });
    // setLoading(false);
  };

  const logged = () => {
    dispatch({ type: "logout" });
  };

  const removeItem = (item) => {
    const newCart = state.cart.filter((x) => {
      return x != item;
    });
    let newTotal = state.total - item.price;
    newTotal = Number(newTotal.toFixed(2));
    let newAmount = state.amount - 1;
    if (localStorage.getItem("token")) {
      updateItems(newCart, newAmount, newTotal);
    }
    dispatch({ type: "remove", item });
  };

  const addToCart = (item) => {
    let val = false;
    state.cart.forEach((x) => {
      if (item.title === x.title) {
        val = true;
        alert(`You already added this beat to your cart`);
      }
    });
    if (!val) {
      const newCart = [...state.cart, item];
      let newTotal = state.total + item.price;
      newTotal = Number(newTotal.toFixed(2));
      let newAmount = state.amount + 1;
      if (localStorage.getItem("token")) {
        newAmount = newCart.length;
        updateItems(newCart, newAmount, newTotal);
      }
      dispatch({ type: "Add", item, newTotal, newCart, newAmount });
    }
  };

  return (
    <AppContext.Provider
      value={{
        redirect,
        setRedirect,
        check,
        setCheck,
        logged,
        fetchData,
        updated,
        setUpdated,
        updateItems,
        loginStatus,
        setLoginStatus,
        isDeleting,
        setIsDeleting,
        loading,
        setLoading,
        setCart,
        updateItems,
        ...state,
        removeItem,
        addToCart,
        removeAll,
        show,
        setShow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
