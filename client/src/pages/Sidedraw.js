import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context.js";
import "../navbar.css";

const Sidedraw = () => {
  const { setShow, show } = useGlobalContext();
  const [name, setName] = useState("");
  const [classN, setClassN] = useState("");
  const [login, setLogin] = useState(false);
  const nav = useNavigate();
  const data = () => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/welcome`, {
      headers: { "x-access-token": localStorage.getItem("token") },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.username) {
          setName("Sign in");
        } else {
          setName(res.username);
          setLogin(true);
        }
      });
  };
  useEffect(() => {
    data();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (show) {
      setClassN("showSide sidedraw");
    } else {
      setClassN("sidedraw");
    }
  }, [show]);
  return (
    <div className={classN}>
      <div className="header">
        <i class="head fas fa-user-circle"></i>
        <h3>Hello, {name}</h3>
      </div>
      <div className="linksSide">
        <a
          href="https://www.youtube.com/c/BlinkGFX/videos?view=0&sort=p&shelf_id=0"
          target="_blank"
        >
          <li>
            <i class="fad fa-chevron-right"></i>
            <a>Youtube</a>
          </li>
        </a>

        <a target="_blank" href="https://www.beatstars.com/byalif">
          <li>
            <i class="fad fa-chevron-right"></i>
            <a>Beats</a>
          </li>
        </a>
        <a
          onClick={() => {
            nav("/contact");
            setShow(!show);
          }}
          href=""
        >
          <li>
            <i class="fad fa-chevron-right"></i>
            <Link
              onClick={() => {
                setShow(!show);
              }}
              to="/contact"
              className="yt"
            >
              Contact
            </Link>
          </li>
        </a>
        <hr />
        <div>
          <Link
            onClick={() => {
              setShow(!show);
            }}
            to="/cart"
          >
            <li>
              <i class="fad fa-chevron-right"></i>

              <i class="fas fa-shopping-cart"></i>
            </li>
          </Link>
        </div>
        <div>
          {login ? (
            <Link
              onClick={() => {
                logout();
              }}
              to="/logout"
            >
              <li>
                {}
                <i class="fad fa-chevron-right"></i>
                <a>Sign out</a>
              </li>
            </Link>
          ) : (
            <Link to="/login">
              <li>
                <i class="fad fa-chevron-right"></i>
                <a>Sign in</a>
              </li>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidedraw;
