import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import axios from 'axios';
import Axios_client from '../axios client/Axios_clinet';
import { store_user } from '../redux/userslice';
import {useDispatch,useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Loginstyle.css"
export default function Login() {
    const dispatch=useDispatch();
    const role = useSelector(state => state.user.role);
  const [showpassword,Setshowpassword]=useState(false);

   
const email=useRef();
const password=useRef();
const navigate=useNavigate();
//storing the validated inputs values
const [valid_attributes,SetValid_attributes]=useState({
    valid_email:'',
    valid_password:''
})
const [errors_messages,set_errors_messages]=useState({
    email_error:'',
    password_error:'',
    empty_email:'the email field is required' ,
    empty_password:'the password field is required'
})



const Verify_password=()=>{
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const perfect_password=password.current.value.length >= minLength  && hasNumber.test(password.current.value)
    && hasSpecialChar.test(password.current.value)
    if (password.current.value.length < minLength) {
        
        set_errors_messages({
            ...errors_messages,password_error: `Password must be at least ${minLength} characters long.`
        })
    }
    else{

        if (!hasNumber.test(password.current.value)) {
            set_errors_messages({
                ...errors_messages,password_error:'Password must contain at least one number.'
            })
        }
        if (!hasSpecialChar.test(password.current.value)) {
            set_errors_messages({
                ...errors_messages,password_error:'the password must contains atleas on special caracter'
            })    }
        if(perfect_password){
            console.log('good password'+password.current.value);
            SetValid_attributes({
                ...valid_attributes,valid_password:password.current.value
            })
            set_errors_messages({
                ...errors_messages,password_error:''
            })
        }
    }


}
const Verify_email = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.current.value)) {
        set_errors_messages({
            ...errors_messages,email_error:'the email is not valid'
        })
    } 
    else{
        SetValid_attributes({
            ...valid_attributes,valid_email:email.current.value
        })
        set_errors_messages({
            ...errors_messages,email_error:''
        })
    }
};
const [is_submited,Set_is_submited]=useState(false);
const crf_api_token=axios.create({baseURL:"http://localhost:8000",withCredentials:true});
const getToken= async ()=>{
    try{

        await crf_api_token.get('/sanctum/csrf-cookie');
        
    }
    catch{
        console.log('the crf token in not obtained');
    }
}
getToken();

async function submit(event){
    event.preventDefault();
    Set_is_submited(true)
    try{
        await Axios_client.post('/login',{EMAIL:valid_attributes.valid_email,PASSWORD:valid_attributes.valid_password})
        .then(res=>{

            dispatch(store_user({user:res.data.user,token:res.data.token,role:res.data.role}));
            localStorage.setItem('user_token',res.data.token);
            set_errors_messages({
                ...errors_messages,email_error:res.data.message
            })
            if(role==='client')
            navigate('/client')
        if(role==='admin')
navigate('/admin')
        }

        );

    }

    catch{
        console.log('error during submitting the form')
    }
}

  return (
      
    <form className='login-form' onSubmit={submit}>
    <div style={{position: "relative", right: "205px", bottom: "8px", width: "41%"}}>
      <div className='login-content-wrapper' style={{width: "130%", display: "flex"}}>
        <div className="login-first">
          <div>
            <h1>Welcome <span style={{textTransform: "lowercase"}}>back</span></h1>
            <div><p>Please <span style={{textTransform: "lowercase"}}>enter your details</span></p></div>
            <div className="login-lindicaters">Email address</div>
            <input ref={email} type="email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={Verify_email} />
            <p>
              {is_submited && !email.current.value ? errors_messages.empty_email : errors_messages.email_error}
            </p>
            <div>
              <div className="login-lindicaters">Password</div>
              <input ref={password} type={showpassword==true?"text":"password"} id="exampleInputPassword1" onChange={Verify_password} />
              {showpassword === true ? (
                <i className="fa-regular login-password-icon fa-eye-slash" onClick={() => Setshowpassword(!showpassword)}></i>
              ) : (
                <i className="fa-regular login-password-icon fa-eye" onClick={() => Setshowpassword(!showpassword)}></i>
              )}
              <p>
                {is_submited && !password.current.value ? errors_messages.empty_password : errors_messages.password_error}
              </p>
            </div>
          </div>
  
          <div className="login-user-assistance-links">
            <input type="checkbox" />
            <span style={{position: "relative", bottom: "2px", right: "156px"}}>Remember <span style={{textTransform: "lowercase"}}>me</span></span>
            <span>
              <Link>Forgot <span style={{textTransform: "lowercase"}}>password</span></Link>
            </span>
          </div>
  
          <button type="submit">Login</button>
  
          <div className="login-register-link">
            Don't <span style={{textTransform: "lowercase"}}>have an account?</span> <Link to="/signup">Sign<span style={{textTransform: "lowercase"}}> up</span></Link>
          </div>
        </div>
        <div className="login-second" style={{position: "relative", top: "156px", right: "75px"}}>
          <img src='logo.png' />
        </div>
      </div>
    </div>
  </form>
  
  



  )
}
