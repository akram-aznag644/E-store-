import React, { useState } from 'react'
import "../styles/Loginstyle.css";
import { useRef } from 'react';
import Axios_client from '../axios client/Axios_clinet';
import {useNavigate} from"react-router-dom"

export default function Signup() {
    //obtaining the inputs values
const username=useRef();
const email=useRef();
const password=useRef();
const confirm_password=useRef();
//storing the validated inputs values
const Navigate=useNavigate();
const [valid_attributes,SetValid_attributes]=useState({
    valid_username:'',
    valid_email:'',
    valid_password:''
})
const [errors_messages,set_errors_messages]=useState({
    username_error:'',
    email_error:'',
    password_error:'',
    empty_username:'the username field is required' ,
    empty_email:'the email field is required' ,
    empty_password:'the password field is required',
    empty_confirm_password:'the password confirmation field is required',
})

const Verify_Username=()=>{
    if(username.current.value.length<=7){
        console.log()
        set_errors_messages({
            ...errors_messages,username_error:'the user name is short,the minimum is 7 caracters'
        })
    }
    else{
        SetValid_attributes({
            ...valid_attributes,valid_username:username.current.value
        })
        set_errors_messages({
            ...errors_messages,username_error:''
        })
    }
}
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
const Verify_Confirmation_password=()=>{
    if(confirm_password.current.value!==password.current.value){
        set_errors_messages({
            ...errors_messages,confirm_password_error:'the password does not match'
        }) 

    }
    else{
        set_errors_messages({
            ...errors_messages,confirm_password_error:''
        }) 
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
const [is_submited,Set_is_submited]=useState(false)
function submit(event){
    event.preventDefault();
    Set_is_submited(true)
    if(valid_attributes!==null){

        Axios_client.post('/store_client',{
            USERNAME:valid_attributes.valid_username,
            EMAIL:valid_attributes.valid_email,
            PASSWORD:valid_attributes.valid_password}).then(res=>console.log(res.data)).catch(err=>console.log(err));
            Navigate('/login')

    }
    
    
   
}
  return (
    <form className="w-25"onSubmit={submit}>
    <div className="form-group">
        <input
            ref={username}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            onChange={Verify_Username}
        />
        
        <p>{is_submited && !username.current.value ?errors_messages.empty_username : errors_messages.username_error}</p>
    </div>

    <div className="form-group">
        <input
            ref={email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={Verify_email}
        />
            <p>{is_submited && !email.current.value ?errors_messages.empty_email : errors_messages.email_error}</p>


    </div>

    <div className="form-group">
        <input
            ref={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={Verify_password}
        />
        <p>{is_submited && !password.current.value ?errors_messages.empty_password : errors_messages.password_error}</p>


    </div>
    <div className="form-group">
        <input
        
            ref={confirm_password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Confirm password"
            onChange={Verify_Confirmation_password}
        />
        <p>{is_submited && !confirm_password.current.value ?errors_messages.empty_confirm_password : errors_messages.confirm_password_error}</p>


    </div>

    <button type="submit" className="btn btn-primary mt-3">
        Create Account
    </button>
</form>


  )
}
