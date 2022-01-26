import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../context.js";
import logo from "./logos/op.png";
function App() {
  const { loginStatus, setLoginStatus } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useNavigate();
  const emailI = useRef(null);
  const passI = useRef(null);
  const emailP = useRef(null);
  const passP = useRef(null);
  const emailC = useRef(null);
  const passC = useRef(null);

  const routeChange = () => {
    history("/");
  };

  const submitform = (e) => {
    e.preventDefault();

    const post = {
      email,
      password: pass,
    };
    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      body: JSON.stringify(post),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === "success") {
          localStorage.setItem("token", res.token);
          emailC.current.style.borderColor = "green";
          emailP.current.style.display = "none";
          emailI.current.className = "icon fas fa-check-circle";
          passC.current.style.borderColor = "green";
          passP.current.style.display = "inline-block";
          passP.current.style.color = "green";
          passP.current.innerText = "Logged in. Redirecting..";
          passI.current.className = "icon fas fa-check-circle";
          setLoginStatus(true);
          setTimeout(() => {
            routeChange();
          }, 2000);
        } else {
          if (res.message === "blank") {
            emailC.current.style.borderColor = "red";
            emailP.current.style.display = "inline-block";
            emailP.current.innerText = "Enter your email";
            emailI.current.className = "iconE fas fa-exclamation-circle";
            passC.current.style.borderColor = "red";
            passP.current.style.display = "inline-block";
            passP.current.innerText = "Password field blank";
            passI.current.className = "iconE fas fa-exclamation-circle";
          }
          if (res.message === "not_found") {
            emailC.current.style.borderColor = "red";
            emailP.current.style.display = "inline-block";
            emailP.current.innerText = "invalid email/pass";
            emailI.current.className = "iconE fas fa-exclamation-circle";
            passC.current.style.borderColor = "red";
            passP.current.style.display = "inline-block";
            passP.current.innerText = "try again";
            passI.current.className = "iconE fas fa-exclamation-circle";
          }
          if (res.message === "not_matched") {
            emailC.current.style.borderColor = "green";
            emailP.current.style.display = "none";
            emailI.current.className = "icon fas fa-check-circle";
            passC.current.style.borderColor = "red";
            passP.current.style.display = "inline-block";
            passP.current.innerText = "invalid password";
            passI.current.className = "iconE fas fa-exclamation-circle";
          }
          if (res.message === "user_blank") {
            emailC.current.style.borderColor = "red";
            emailP.current.style.display = "inline-block";
            emailP.current.innerText = "Cannot leave field empty";
            emailI.current.className = "iconE fas fa-exclamation-circle";
            passC.current.style.borderColor = "green";
            passP.current.style.display = "none";
            passP.current.innerText = "";
            passI.current.className = "icon fas fa-check-circle";
          }
          if (res.message === "pass_blank") {
            emailC.current.style.borderColor = "green";
            emailP.current.style.display = "none";
            emailP.current.innerText = "";
            emailI.current.className = "icon fas fa-check-circle";
            passC.current.style.borderColor = "red";
            passP.current.style.display = "inline-block";
            passP.current.innerText = "password field is empty";
            passI.current.className = "iconE fas fa-exclamation-circle";
          }
        }
      })
      .catch((err) => {
        setLoginStatus(false);
        console.log(err);
      });
  };

  return (
    <>
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
            <h3 style={{ textAlign: "center" }}>Log in</h3>
            <form onSubmit={submitform} className="thisForm">
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
                  <Link className="rightSide" to="/forgotPass">
                    forgot password?
                  </Link>
                </div>
                <div>
                  <button className="btns" type="submit">
                    Log in
                  </button>
                  <button
                    className="btns"
                    onClick={() => {
                      history("/register");
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
