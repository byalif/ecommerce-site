import React from "react";
import Login from "./pages/login.js";
import Register from "./pages/Register.js";
import Welcome from "./pages/Welcome.js";
import Redirect from "./pages/Redirect.js";
import Logout from "./pages/Logout.js";
import ForgotPass from "./pages/ForgotPass.js";
import ResetPass from "./pages/ResetPass.js";
import Store from "./pages/Store.js";
import Cart from "./pages/Cart.js";
import Success from "./pages/success.js";
import Payment from "./pages/payment.js";
import Contact from "./pages/Contact.js";
import { AppProvider } from "./context.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/home" element={<Welcome />} /> */}
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/resetPass/:id/:token" element={<ResetPass />} />
          <Route path="/store" element={<Store />} />
          <Route path="/" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Store />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
