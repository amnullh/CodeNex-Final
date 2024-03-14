import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import '../css/Sign.css'


const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
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
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
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
      username: "",
    });
  };

  return (
    <div className="log-page">
      <nav>
        Logo
        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#">Discussion</a>
        </div> */}
      </nav>
    
    <div className='log-body'>
      <div className="log-container sign-up" id="log-container">
        <div className="log-form-container log-sign">
          <div className='log-form'>
            <h1>Create Account</h1>
            {/* <form onSubmit={handleSubmit}> */}
              <div className="log-social-icons">
                <a href="/" className="log-icon"><i className="fa-brands fa-google"></i></a>
                <a href="/" className="log-icon"><i className="fa-brands fa-microsoft"></i></a>
                <a href="/" className="log-icon"><i className="fa-brands fa-github"></i></a>
                <a href="/" className="log-icon"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
              />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
              <button onClick={handleSubmit}>Sign Up</button>
                <p>Already have an account? <Link to="/">Sign In</Link></p>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;

