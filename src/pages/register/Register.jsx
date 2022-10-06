import React, { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const handleRegistration = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match!...");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
            navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Sodev-Social</h3>
          <span className="registerDesc">
            Connect with friend and the world around you on Sodev-Social
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleRegistration}>
            <input
              required
              ref={username}
              type="text"
              placeholder="username"
              className="registerInput"
            />
            <input
              required
              ref={email}
              type="email"
              placeholder="email"
              className="registerInput"
            />
            <input
              required
              ref={password}
              type="password"
              minLength={6}
              placeholder="password"
              className="registerInput"
            />
            <input
              required
              ref={passwordAgain}
              type="password"
              minLength={6}
              placeholder="password Again"
              className="registerInput"
            />
            <button className="registerBtn">Sign Up</button>

            <button className="registerRegisterBtn" type="submit">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
