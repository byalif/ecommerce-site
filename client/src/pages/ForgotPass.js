import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context.js";
import logo from "./logos/op.png";

function App() {
  const [email, setEmail] = useState("");
  const emailP = useRef(null);
  const emailC = useRef(null);
  const emailI = useRef(null);
  const expire = useRef(null);

  const submitform = (e) => {
    e.preventDefault();
    const post = {
      email,
    };
    fetch(`${process.env.REACT_APP_API_URL}/auth/forgotPass`, {
      body: JSON.stringify(post),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message == "success") {
          emailI.current.className = "icon fas fa-check-circle";
          emailP.current.style.display = "none";
          // setResetEmail(email);
          expire.current.style.display = "block";
          //   nav("/resetPassword");
        }
        if (res.message == "not_found") {
          emailI.current.className = "iconE fas fa-exclamation-circle";
          emailC.current.style.borderColor = "red";
          emailP.current.innerText = "Email not in dataBase";
          emailP.current.style.display = "inline-block";
        } else {
          emailC.current.style.borderColor = "green";
        }
      })
      .catch((err) => {
        console.log("err");
      });
  };

  return (
    <div className="container">
      <div>
        <h3 style={{ textAlign: "center" }}>
          <img
            className="lo"
            style={{ margin: "0 auto" }}
            width="385"
            src={logo}
            alt=""
          />
        </h3>
        <div className="form-login">
          <form onSubmit={submitform} className="thisForm">
            <h3 style={{ textAlign: "center" }}>
              Enter email for a reset link
            </h3>
            <div className="center">
              <div className="inputs">
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    ref={emailC}
                    value={email}
                    type="text"
                    id=""
                  />
                  <i ref={emailI} className=""></i>
                  <div>
                    <p ref={emailP} className="pl-12 error">
                      Error
                    </p>
                  </div>
                </div>

                <button className="btns">Send</button>
              </div>
              <Link className="rightSide" to="/home">
                Redirect back home
              </Link>
            </div>
          </form>
        </div>
        <div ref={expire} className="expire">
          <p className="ml">A reset link has been sent to your email.</p>
          <p className="ml">It will expire in 15 minutes..</p>
        </div>
      </div>
    </div>
  );
}

export default App;
