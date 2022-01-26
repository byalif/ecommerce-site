import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
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
          backHome();
        } else {
          setName(res.username);
          setLoading(false);
        }
      });
  };

  const backHome = () => {
    setTimeout(() => {
      nav("/");
    }, 2500);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      {localStorage.getItem("token") ? (
        !loading ? (
          <div>
            <Link
              onClick={() => {
                localStorage.removeItem("token");
              }}
              to="/logout"
            >
              Log out
            </Link>

            <h4>welcome {name},</h4>
            <button
              onClick={() => {
                nav("/store");
              }}
              className="btn"
            >
              Purchase beats
            </button>
          </div>
        ) : (
          <h4>Loading...</h4>
        )
      ) : (
        <h4>Not logged in... redirecting</h4>
      )}
    </div>
  );
};

export default Welcome;
