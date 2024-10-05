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
  const [valid_attributes, SetValid_attributes] = useState({
    valid_username: '',
    valid_email: '',
    valid_password: ''
  });
  const [errors_messages, set_errors_messages] = useState({
    username_error: '',
    email_error: '',
    password_error: '',
    confirm_password_error: '',
    empty_username: 'The username field is required',
    empty_email: 'The email field is required',
    empty_password: 'The password field is required',
    empty_confirm_password: 'The password confirmation field is required',
  });
  const [showpassword,Setshowpassword]=useState(false);
  const [showconfirmpassword,Setconfirmpassword]=useState(false);
  
  const Verify_Username = () => {
    if (username.current.value.length <= 7) {
      set_errors_messages({
        ...errors_messages, username_error: 'The username is too short, minimum is 7 characters'
      });
    } else {
      SetValid_attributes({
        ...valid_attributes, valid_username: username.current.value
      });
      set_errors_messages({
        ...errors_messages, username_error: ''
      });
    }
  }

  const Verify_password = () => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const perfect_password = password.current.value.length >= minLength && hasNumber.test(password.current.value)
      && hasSpecialChar.test(password.current.value);
    
    if (password.current.value.length < minLength) {
      set_errors_messages({
        ...errors_messages, password_error: `Password must be at least ${minLength} characters long.`
      });
    } else if (!hasNumber.test(password.current.value)) {
      set_errors_messages({
        ...errors_messages, password_error: 'Password must contain at least one number.'
      });
    } else if (!hasSpecialChar.test(password.current.value)) {
      set_errors_messages({
        ...errors_messages, password_error: 'The password must contain at least one special character.'
      });
    } else if (perfect_password) {
      SetValid_attributes({
        ...valid_attributes, valid_password: password.current.value
      });
      set_errors_messages({
        ...errors_messages, password_error: ''
      });
    }
  }

  const Verify_Confirmation_password = () => {
    if (confirm_password.current.value !== password.current.value) {
      set_errors_messages({
        ...errors_messages, confirm_password_error: 'The password does not match'
      });
    } else {
      set_errors_messages({
        ...errors_messages, confirm_password_error: ''
      });
    }
  }

  const Verify_email = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.current.value)) {
      set_errors_messages({
        ...errors_messages, email_error: 'The email is not valid'
      });
    } else {
      SetValid_attributes({
        ...valid_attributes, valid_email: email.current.value
      });
      set_errors_messages({
        ...errors_messages, email_error: ''
      });
    }
  };

  const [is_submited, Set_is_submited] = useState(false);
  
  function submit(event) {
    event.preventDefault();
    Set_is_submited(true);
    
    if (valid_attributes) {
      Axios_client.post('/store_client', {
        USERNAME: valid_attributes.valid_username,
        EMAIL: valid_attributes.valid_email,
        PASSWORD: valid_attributes.valid_password
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
      navigate('/login');
    }
  }

  return (
    <form onSubmit={submit}>
  <div style={{ position: "relative", right: "205px", bottom: "8px", width: "41%" }}>
    <div className='content-wrapper' style={{ width: "130%", display: "flex" }}>
      <div className="first">
        <div>
          <h1 >Sign <span style={{textTransform:"lowercase"}}>up</span></h1>
          <div>
            <p>Please <span style={{ textTransform: "lowercase" }}>enter your details</span></p>
          </div>
          <div className='form-field-handlers' style={{ display: "flex" }}>
            <div className='username-email-handler'>
              <div className="indicaters">Username</div>
              <input ref={username} type="text" onChange={Verify_Username} />
              <p>{is_submited && !username.current.value ? errors_messages.empty_username : errors_messages.username_error}</p>

              <div className="indicaters">Email address</div>
              <input ref={email} type="email" onChange={Verify_email} />
              <p>{is_submited && !email.current.value ? errors_messages.empty_email : errors_messages.email_error}</p>
            </div>

            <div className='password-cpassword-handler' style={{position:"relative",left:"60px"}}>
             <div className="passfield">
                    <div className="indicaters">Password</div>
                     <input ref={password} type={showpassword===true?"text": "password"} onChange={Verify_password} />
                     {
                      showpassword===true?
                      <i class="fa-regular fa-eye-slash" onClick={()=>Setshowpassword(!showpassword)}></i>
                      :
                     <i class="fa-regular fa-eye" onClick={()=>Setshowpassword(!showpassword)}></i>
                     }
                     <p>{is_submited && !password.current.value ? errors_messages.empty_password : errors_messages.password_error}</p>
             </div>
             <div className="cpassfiled">
             <div className="indicaters">Confirm Password</div>
              <input ref={confirm_password} type="password" onChange={Verify_Confirmation_password} />
              {
                    showconfirmpassword===true?
                      <i class="fa-regular fa-eye-slash" onClick={()=>Setconfirmpassword(!showpassword)}></i>
                      :
                     <i class="fa-regular fa-eye" onClick={()=>Setconfirmpassword(!showpassword)}></i>
                     }
              <p>{is_submited && !confirm_password.current.value ? errors_messages.empty_confirm_password : errors_messages.confirm_password_error}</p>
               
             </div>


              
            </div>
          </div>

          <button type="submit">Create Account</button>

          <div className="register-link">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
      <div className="second" style={{    position: "relative",
    right: "282px",
    bottom: "10px", }}>
        <img src='logo.png' alt="logo" />
      </div>
    </div>
  </div>
</form>

  );
}
