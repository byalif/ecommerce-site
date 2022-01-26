import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const Logout = () => {
  const { setLoginStatus, removeAll } = useGlobalContext();
  const redirect = () => {
    nav("/home");
  };
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      redirect();
    }
    setTimeout(() => {
      redirect();
    }, 1000);
  }, []);
  return <div>Successfuly logged out! Redirecting to home...</div>;
};

export default Logout;
