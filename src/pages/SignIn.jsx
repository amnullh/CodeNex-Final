import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import '../css/Sign.css'

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/room");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="log-page">
    <nav>
      Logo
    </nav>

    <div className='log-body'>
      <div className="log-container sign-in" id="log-container">
        <div className="log-form-container log-sign">
          <div className='log-form'>
            <h1>Sign In</h1>
            {/* <form onSubmit={handleSubmit}> */}
              <div className="log-social-icons">
                <a href="/" className="log-icon"><i className="fa-brands fa-google"></i></a>
                <a href="/" className="log-icon"><i className="fa-brands fa-microsoft"></i></a>
                <a href="/" className="log-icon"><i className="fa-brands fa-github"></i></a>
                <a href="/" className="log-icon"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
              <span>or use your email password</span>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleOnChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleOnChange}
              />
              <a href="/">Forget Your Password?</a>
                <button onClick={handleSubmit}>Sign In</button>
                <p>Don’t have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;


