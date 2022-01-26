import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../navbar.css";
import { useGlobalContext } from "../context.js";

import logo from "./logos/logo.png";

const Navbar = () => {
  const nav = useNavigate();
  const {
    logged,
    setLoginStatus,
    loginStatus,
    isDeleting,
    loading,
    amount,
    show,
    setShow,
  } = useGlobalContext();
  const [login, setLogin] = useState(false);
  //   const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const data = () => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/welcome`, {
      headers: { "x-access-token": localStorage.getItem("token") },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.username) {
          setLogin(true);
          setName(res.username);
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    logged();
    nav("/logout");
  };

  useEffect(() => {
    data();
  }, []);
  return (
    <div className="color-nav">
      <div className="nav-cont">
        <nav className="navbar">
          <div className="links3">
            <div className="nav-logo">
              <img
                onClick={() => {
                  nav("/home");
                }}
                className="img"
                src={logo}
                alt=""
              />
            </div>
            <ul className="l2 links">
              <li>
                <a
                  href="https://www.youtube.com/c/BlinkGFX/videos?view=0&sort=p&shelf_id=0"
                  className="yt"
                  target="_blank"
                >
                  Youtube
                </a>
              </li>
              <li>
                <a
                  href="https://www.beatstars.com/byalif"
                  target="_blank"
                  className="yt"
                >
                  Beats
                </a>
              </li>
              <li>
                <Link to="/contact" className="yt">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <ul className="links">
            <li>
              {login ? (
                <div className="signout">
                  <a className="yt">Hello, {name}</a>
                  <button
                    onClick={() => {
                      setLoginStatus(false);
                      logout();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="yt">
                  Sign in
                </Link>
              )}
            </li>
            <li
              onClick={() => {
                nav("/cart");
              }}
            >
              <Link to="/home" className="link-btn cart-left">
                cart
                <i class="fas fa-shopping-cart"></i>
                <span className="cart-ammount">
                  {isDeleting && loginStatus ? "" : amount}
                </span>
              </Link>
            </li>
          </ul>
          <div
            onClick={() => {
              setShow(!show);
            }}
            className="hamburger-menu"
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
