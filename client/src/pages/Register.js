import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logos/op.png";
import { useGlobalContext } from "../context.js";

function App() {
  const { redirect, setRedirect } = useGlobalContext();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const userI = useRef(null);
  const emailI = useRef(null);
  const passI = useRef(null);
  const userP = useRef(null);
  const emailP = useRef(null);
  const passP = useRef(null);
  const userC = useRef(null);
  const emailC = useRef(null);
  const passC = useRef(null);

  const navigate = useNavigate();

  const redirected = () => {
    setRedirect(true);
    navigate("/redirect");
  };

  const registerAuth = (user, email, pass) => {
    if (!user) {
      userP.current.style.display = "inline-block";
      userI.current.className = "iconE fas fa-exclamation-circle";
      userP.current.innerText = "Enter a username";
      userC.current.style.borderColor = "red";
    } else {
      let regx2 = /[\w.]{1,}/;
      if (regx2.test(user)) {
        userP.current.innerText = "";
        userI.current.className = "icon fas fa-check-circle";
        userC.current.style.borderColor = "green";
      } else {
        userC.current.style.borderColor = "red";
        userP.current.style.display = "inline-block";
        userP.current.innerText = "min length of 1";
        userI.current.className = "iconE fas fa-exclamation-circle";
      }
    }
    if (!email) {
      emailC.current.style.borderColor = "red";
      emailI.current.className = "iconE fas fa-exclamation-circle";
      emailP.current.style.display = "inline-block";
      emailP.current.innerText = "Enter an email";
    } else {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(email)) {
        emailC.current.style.borderColor = "green";
        emailP.current.style.display = "none";
        emailI.current.className = "icon fas fa-check-circle";
      } else {
        emailC.current.style.borderColor = "red";
        emailP.current.style.display = "inline-block";
        emailP.current.innerText = "Not a valid email";
        emailI.current.className = "iconE fas fa-exclamation-circle";
      }
    }
    if (!pass) {
      passC.current.style.borderColor = "red";
      passP.current.style.display = "inline-block";
      passP.current.innerText = "Enter a password";
      passI.current.className = "iconE fas fa-exclamation-circle";
    } else {
      if (pass.length > 5) {
        passC.current.style.borderColor = "green";
        passP.current.style.display = "none";
        passI.current.className = "icon fas fa-check-circle";
      } else {
        passC.current.style.borderColor = "red";
        passP.current.style.display = "inline-block";
        passP.current.innerText = "min length of 6";
        passI.current.className = "iconE fas fa-exclamation-circle";
      }
    }
  };

  const submitform = (e) => {
    e.preventDefault();
    registerAuth(user, email, pass);
    const post = {
      username: user,
      email,
      password: pass,
    };
    fetch(`${process.env.REACT_APP_API_URL}/auth`, {
      body: JSON.stringify(post),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.duplicate) {
          emailC.current.style.borderColor = "green";
          emailP.current.style.display = "none";
          emailI.current.className = "icon fas fa-check-circle";
          setUser("");
          setEmail("");
          setPass("");
          redirected();
        } else {
          emailC.current.style.borderColor = "red";
          emailP.current.style.display = "inline-block";
          emailP.current.innerText = "Email already exists";
          emailI.current.className = "iconE fas fa-exclamation-circle";
        }
      })
      .catch((err) => {
        console.log(err);
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
          <form onSubmit={submitform} className="thisForm ">
            <h3 style={{ textAlign: "center" }}>Sign up!</h3>
            <div className="center ">
              <div className="inputs ">
                <div>
                  <label htmlFor="username">Username</label>

                  <input
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                    ref={userC}
                    value={user}
                    type="text"
                    id=""
                  />
                  <i ref={userI} className=""></i>
                  <div>
                    <p ref={userP} className="pl-12 error">
                      Error
                    </p>
                  </div>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    ref={emailC}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type="text"
                    id=""
                  />

                  <i ref={emailI} className=""></i>
                  <div>
                    <p ref={emailP} className="pl-20 error">
                      Error
                    </p>
                  </div>
                </div>
                <div>
                  <label htmlFor="pass">Password</label>
                  <input
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                    ref={passC}
                    value={pass}
                    type="password"
                    id=""
                  />
                  <i ref={passI} className=""></i>
                  <div>
                    <p ref={passP} className="pl-12 error">
                      Error
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="container2
            "
              >
                <button className="btns">Register</button>
                <button
                  className="btns"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
