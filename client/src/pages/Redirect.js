import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../context.js";

const Redirect = () => {
  const nav = useNavigate();
  const { redirect, setRedirect } = useGlobalContext();

  return (
    <>
      {redirect ? (
        <div>
          <h2>account created!..</h2>
          <Link to="/login">or Log in</Link>
        </div>
      ) : (
        <div>
          <h4>ooops.. </h4>
          <Link to="/home">Go home</Link>
        </div>
      )}
    </>
  );
};

export default Redirect;
