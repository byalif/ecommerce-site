import React from "react";
import Navbar from "./Navbar.js";
import Paypal from "./Paypal.js";
import Backdrop from "./Backdrop.js";
import { useEffect } from "react";
import { useGlobalContext } from "../context.js";
import checout from "./logos/che.png";

const Payment = () => {
  const { cart, amount, total, fetchData } = useGlobalContext();
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Backdrop></Backdrop>
      <div className="total t-2">
        <img className="checkout" src={checout} alt="" />
        <hr width="480px" />
        <h4>
          Subtotal ({amount}) {amount > 1 ? "items" : "item"}
        </h4>
        <p>${total}</p>
        <br />
      </div>

      {localStorage.getItem("token") ? (
        <Paypal></Paypal>
      ) : (
        <h2>Please sign in..</h2>
      )}
    </div>
  );
};

export default Payment;
