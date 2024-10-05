import React, { useState, useRef } from 'react';
import "../styles/Signup.css";
import Axios_client from '../axios client/Axios_clinet';
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirm_password = useRef();
  const navigate = useNavigate();
  
  const [validAttributes, setValidAttributes] = useState({
    valid_username: '',
    valid_email: '',
    valid_password: ''
  });

  const [errorMessages, setErrorMessages] = useState({
    username_error: '',
    email_error: '',
    password_error: '',
    confirm_password_error: '',
    empty_username: 'The username field is required',
    empty_email: 'The email field is required',
    empty_password: 'The password field is required',
    empty_confirm_password: 'The password confirmation field is required',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const verifyUsername = () => {
    if (username.current.value.length <= 7) {
      setErrorMessages({ ...errorMessages, username_error: 'The username is short, minimum is 7 characters' });
    } else {
      setValidAttributes({ ...validAttributes, valid_username: username.current.value });
      setErrorMessages({ ...errorMessages, username_error: '' });
    }
  };

  const verifyPassword = () => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const isValidPassword = password.current.value.length >= minLength && hasNumber.test(password.current.value) && hasSpecialChar.test(password.current.value);

    if (password.current.value.length < minLength) {
      setErrorMessages({ ...errorMessages, password_error: `Password must be at least ${minLength} characters long.` });
    } else if (!hasNumber.test(password.current.value)) {
      setErrorMessages({ ...errorMessages, password_error: 'Password must contain at least one number.' });
    } else if (!hasSpecialChar.test(password.current.value)) {
      setErrorMessages({ ...errorMessages, password_error: 'Password must contain at least one special character.' });
    } else if (isValidPassword) {
      setValidAttributes({ ...validAttributes, valid_password: password.current.value });
      setErrorMessages({ ...errorMessages, password_error: '' });
    }
  };

  const verifyConfirmPassword = () => {
    if (confirm_password.current.value !== password.current.value) {
      setErrorMessages({ ...errorMessages, confirm_password_error: 'The passwords do not match' });
    } else {
      setErrorMessages({ ...errorMessages, confirm_password_error: '' });
    }
  };

  const verifyEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.current.value)) {
      setErrorMessages({ ...errorMessages, email_error: 'The email is not valid' });
    } else {
      setValidAttributes({ ...validAttributes, valid_email: email.current.value });
      setErrorMessages({ ...errorMessages, email_error: '' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validAttributes) {
      Axios_client.post('/store_client', {
        USERNAME: validAttributes.valid_username,
        EMAIL: validAttributes.valid_email,
        PASSWORD: validAttributes.valid_password
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

      navigate('/login');
    }
  };

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      <div style={{ position: "relative", right: "205px", bottom: "8px", width: "41%" }}>
        <div className='signup-content-wrapper' style={{ width: "130%", display: "flex" }}>
          <div className="signup-first">
            <div>
              <h1>Sign <span style={{ textTransform: "lowercase" }}>up</span></h1>
              <div>
                <p className='hint-message'>Please <span style={{ textTransform: "lowercase" }}>enter your details</span></p>
              </div>
              <div className='signup-form-field-handlers' style={{ display: "flex" }}>
                <div className='signup-username-email-handler'>
                  <div className="signup-indicaters">Username</div>
                  <input ref={username} type="text" onChange={verifyUsername} />
                  <p className='email-input-errors' style={{width: "101%",position:"relative",top: "13px"}}>
                    {isSubmitted && !username.current.value ? errorMessages.empty_username : errorMessages.username_error}
                  </p>

                  <div className="signup-indicaters">Email address</div>
                  <input ref={email} type="email" onChange={verifyEmail} />
                  <p className='email-input-errors' style={{width: "101%",position:"relative",top: "13px"}}>
                    {isSubmitted && !email.current.value ? errorMessages.empty_email : errorMessages.email_error}
                  </p>
                </div>

                <div className='signup-password-cpassword-handler' style={{ position: "relative", left: "60px" }}>
                  <div className="signup-passfield">
                    <div className="signup-indicaters">Password</div>
                    <input ref={password} type={showPassword ? "text" : "password"} onChange={verifyPassword} />
                    {showPassword ? (
                      <i className="fa-regular fa-eye-slash" onClick={() => setShowPassword(!showPassword)}></i>
                    ) : (
                      <i className="fa-regular fa-eye" onClick={() => setShowPassword(!showPassword)}></i>
                    )}
                    <p className='password-input-errors' style={{color:"red",position: "relative",bottom: "10px"}}>
                      {isSubmitted && !password.current.value ? errorMessages.empty_password : errorMessages.password_error}
                    </p>
                  </div>
                  <div className="signup-cpassfiled">
                    <div className="signup-indicaters">Confirm Password</div>
                    <input ref={confirm_password} type={showConfirmPassword ? "text" : "password"} onChange={verifyConfirmPassword} />
                    {showConfirmPassword ? (
                      <i className="fa-regular fa-eye-slash" onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                    ) : (
                      <i className="fa-regular fa-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                    )}
                    <p className='password-input-errors' style={{width: "101%",position:"relative",top: "12px",marginTop:"-20px"}}>
                      {isSubmitted && !confirm_password.current.value ? errorMessages.empty_confirm_password : errorMessages.confirm_password_error}
                    </p>
                  </div>
                </div>
              </div>

              <button type="submit">Create Account</button>

              <div className="signup-register-link">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
            </div>
          </div>
          <div className="signup-second" style={{ position: "relative", right: "282px", bottom: "10px" }}>
            <img src='logo.png' alt="logo" />
          </div>
        </div>
      </div>
    </form>
  );
}
