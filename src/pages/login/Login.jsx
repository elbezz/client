import React, { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
export const Login = () => {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
   
  //bellow we could use useState hook, but everytime we write something in the email field, is going to re-render, in order to avoid this we use usRef hook instead
  const email = useRef();
  const password = useRef();
  //console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Sodev-Social</h3>
          <span className="loginDesc">
            Connect with friend and the world around you on Sodev-Social
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="email"
              typeof="email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              type="password"
              placeholder="password"
              typeof="password"
              className="loginInput"
              required
              minLength={6}
              ref={password}
            />
            <button className="loginBtn" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="success" size={"20px"} />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForgotPassword">Forgot Password ?</span>
            <button className="loginRegisterBtn">
              {isFetching ? (
                <CircularProgress color="success" size={"20px"} />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
