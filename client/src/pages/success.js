import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../context.js";

const Success = () => {
  const { cart } = useGlobalContext();
  const { check, setCheck } = useGlobalContext();
  const nav = useNavigate();
  useEffect(() => {
    fetchit();
  }, []);

  const fetchit = () => {
    let buy = "";
    cart.forEach((x) => {
      buy = buy + x.title + ": " + x.url + `\n`;
    });
    fetch(`${process.env.REACT_APP_API_URL}/auth/purchase`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
      method: "POST",
    })
      .then(() => {
        console.log("scuess");
      })
      .catch(() => {
        console.log("err");
      });
  };

  return (
    <div>
      {check ? (
        <div>
          <h4>
            Thank you!! A download link has been sent to your email address.
          </h4>
        </div>
      ) : (
        <div>
          <h4>ooops....</h4>
          <Link to="/home">Go home</Link>
        </div>
      )}
    </div>
  );
};

export default Success;
