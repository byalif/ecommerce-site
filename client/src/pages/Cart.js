import React from "react";
import Navbar from "./Navbar.js";
import Backdrop from "./Backdrop.js";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context.js";
import logo from "./logos/shop.png";

const Cart = () => {
  const nav = useNavigate();
  const {
    updated,
    loginStatus,
    setIsDeleting,
    loading,
    setLoading,
    removeItem,
    removeAll,
    cart,
    amount,
    total,
    setCart,
  } = useGlobalContext();

  useEffect(() => {
    fetchData();
  }, [updated]);
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

  return (
    <section>
      <Navbar></Navbar>
      <Backdrop></Backdrop>
      {loading && loginStatus ? (
        <h3>Loading..</h3>
      ) : (
        <div className="cartPage">
          <div>
            <h2 style={{ textAlign: "center" }}>
              <img
                style={{ objectFit: "cover", height: "110px" }}
                className="imgL2"
                width="400"
                src={logo}
                alt=""
              />
            </h2>
          </div>
          {cart.map((x, i) => {
            return (
              <div key={i} className="video">
                <div className="title-head">
                  <h4 className="title">{x.title}</h4>
                </div>
                <div className="both">
                  <div className="wrapper" key={i}>
                    <iframe
                      className="vid"
                      style={{ boxShadow: "2px 5px 10px black" }}
                      src={x.url}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen="true"
                    ></iframe>
                    <div className="sider">
                      <h4>${x.price}</h4>
                      <i
                        onClick={() => {
                          setIsDeleting(true);
                          removeItem(x);
                        }}
                        class="fas fa-trash-alt"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {total == 0 ? (
            <h4 style={{ textAlign: "center" }}>
              Your Cart is Empty. <Link to="/home">Go back</Link>{" "}
              {!localStorage.getItem("token") && (
                <p>
                  or{` `}
                  <span
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => {
                      nav("/login");
                    }}
                  >
                    Sign in
                  </span>
                </p>
              )}
            </h4>
          ) : (
            <div className="total">
              <h4>
                Subtotal ({amount}) {amount > 1 ? "items" : "item"}
              </h4>
              <p>${total}</p>
              <button
                onClick={() => {
                  if (!localStorage.getItem("token")) {
                    nav("/login");
                  } else {
                    nav("/checkout");
                  }
                }}
                style={{
                  cursor: "pointer",
                  padding: "6px",
                  marginBottom: "5px",
                  border: "none",
                  color: "white",
                  backgroundColor: "black",
                }}
              >
                Proceed to checkout
              </button>
              <br />
              <p>
                or{" "}
                <a
                  onClick={() => {
                    removeAll();
                  }}
                  href=""
                >
                  {" "}
                  Clear Cart{" "}
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Cart;
