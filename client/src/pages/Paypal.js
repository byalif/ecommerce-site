import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context.js";

const Paypal = () => {
  const { cart, amount, total, fetchData } = useGlobalContext();
  const { check, setCheck } = useGlobalContext();
  useEffect(() => {
    fetchData();
  }, []);
  const paypal = useRef();
  const nav = useNavigate();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `${amount} beats`,
                amount: {
                  currency_code: "USD",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          setCheck(true);
          nav("/success");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div className="paypal" ref={paypal}></div>
    </div>
  );
};

export default Paypal;
