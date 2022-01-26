import { useRef, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "./logos/op.png";

function App() {
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const { id, token } = useParams();

  const nav = useNavigate();
  const passP = useRef(null);
  const passC = useRef(null);
  const passI = useRef(null);
  const pass2P = useRef(null);
  const pass2C = useRef(null);
  const pass2I = useRef(null);

  const matchPassword = (p, p2) => {
    if (p !== p2) {
      return false;
    } else {
      return true;
    }
  };

  const submitform = (e) => {
    e.preventDefault();
    if (matchPassword(pass, pass2)) {
      const post = {
        newPass: pass,
      };
      fetch(`${process.env.REACT_APP_API_URL}/auth/resetPass/${id}/${token}`, {
        body: JSON.stringify(post),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.message == "sent") {
            passC.current.style.borderColor = "green";
            passI.current.className = "icon fas fa-check-circle";
            pass2C.current.style.borderColor = "green";
            pass2P.current.style.display = "inline-block";
            pass2P.current.style.color = "black";
            pass2P.current.innerText = "password has been updated!";
            pass2I.current.className = "icon fas fa-check-circle";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      passC.current.style.borderColor = "red";
      passP.current.style.display = "none";
      passI.current.className = "iconE fas fa-exclamation-circle";
      passC.current.style.borderColor = "red";
      pass2P.current.style.display = "inline-block";
      pass2P.current.innerText = "passwords dont match";
      pass2I.current.className = "iconE fas fa-exclamation-circle";
    }
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
            <h3 style={{ textAlign: "center" }}>Reset password</h3>
            <div className="center">
              <div className="inputs">
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
                  <label htmlFor="pass2">Password x2</label>
                  <input
                    onChange={(e) => {
                      setPass2(e.target.value);
                    }}
                    ref={pass2C}
                    value={pass2}
                    type="password"
                    id=""
                  />
                  <i ref={pass2I} className=""></i>
                  <div>
                    <p ref={pass2P} className="pl-12 error">
                      Error
                    </p>
                  </div>
                </div>
                <button className="btns">Reset</button>
              </div>
              <Link className="rightSide" to="/login">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
