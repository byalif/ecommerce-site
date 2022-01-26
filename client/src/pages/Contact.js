import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context.js";
import Backdrop from "./Backdrop.js";
import Navbar from "./Navbar.js";

import logo from "./logos/op.png";

function App() {
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const emailP = useRef(null);
  const emailC = useRef(null);
  const emailI = useRef(null);
  const expire = useRef(null);
  const email2P = useRef(null);
  const email2C = useRef(null);
  const email2I = useRef(null);
  const mes = useRef(null);

  const submitform = (e) => {
    e.preventDefault();
    if (email && email2) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(email)) {
        const post = {
          email,
          message: email2,
        };
        fetch(`${process.env.REACT_APP_API_URL}/auth/contact`, {
          body: JSON.stringify(post),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.message === "success") {
              emailC.current.style.borderColor = "green";
              emailP.current.style.display = "inline-block";
              emailP.current.style.color = "green";
              emailP.current.innerText = "Email sent!";
            }
          })
          .catch((err) => {
            console.log("err");
          });
      } else {
        emailC.current.style.borderColor = "red";
        emailP.current.style.display = "inline-block";
        emailP.current.innerText = "Not a valid email";
      }
    } else {
      if (!email && !email2) {
        emailP.current.style.display = "inline-block";
        emailP.current.style.color = "red";
        emailP.current.innerText = "Cant leave fields blank";
      } else if (!email) {
        if (!email) {
          emailC.current.style.borderColor = "red";
          emailP.current.style.display = "inline-block";
          emailP.current.innerText = "Enter an email";
        } else {
          const regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (regex.test(email)) {
            emailC.current.style.borderColor = "green";
            emailP.current.style.display = "none";
          } else {
            emailC.current.style.borderColor = "red";
            emailP.current.style.display = "inline-block";
            emailP.current.innerText = "Not a valid email";
          }
        }
      } else {
        emailP.current.style.display = "inline-block";
        emailP.current.style.color = "red";
        emailP.current.innerText = "Enter a message..";
      }
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <Backdrop></Backdrop>
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
          <div className="form-login con">
            <form onSubmit={submitform} className="thisForm">
              <h3 style={{ textAlign: "center" }}>Send me an email!</h3>
              <div className="center">
                <div className="inputs">
                  <div className="display-box">
                    <div className="text-box">
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
                      </div>
                      <textarea
                        ref={mes}
                        placeholder="type your email here (max-characters of 300)...."
                        rows="5"
                        maxlength="300"
                        cols="60"
                        ref={email2C}
                        value={email2}
                        onChange={(e) => {
                          setEmail2(e.target.value);
                        }}
                        name="description"
                      ></textarea>
                    </div>
                    <i ref={emailI} className=""></i>
                    <div>
                      <p
                        style={{ marginRight: "90px" }}
                        ref={emailP}
                        className="pl-12 error"
                      >
                        Error
                      </p>
                    </div>
                  </div>
                  <button type="submit" className="btns">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div ref={expire} className="expire">
            <p className="ml">A reset link has been sent to your email.</p>
            <p className="ml">It will expire in 15 minutes..</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
