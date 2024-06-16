/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "./LoginPopUp.css"
import axios from "axios"
import { assets } from "../../assets/assets";
import { useContext } from 'react';
import {StoreContext} from "../../context/StoreContext"
const LoginPopUp = ({ setShowLogin }) => {
  const { url,setToken } = useContext(StoreContext)
  const [currState, setCurrentState] = useState("Sign Up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const onLogin = async (event) => {
      event.preventDefault();
      let newUrl=url;
      if(currState==="Login"){
        newUrl+="/api/user/login"
      }
      else
      {
        newUrl+="/api/user/register"
      }
      const response=await axios.post(newUrl,data);
      if(response.data.success)
        {
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowLogin(false)
        }
        else{
          alert(response.data.message);
        }
  }
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your Password' required />
        </div>
        <button type='submit'>{currState === "Sign up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing I agree to the terms of use and Privacy Policy.</p>
        </div>

        {currState === "Login" ?
          <p>Create a new Account?<span onClick={() => setCurrentState("Sign up")}>Click Here</span></p>
          :
          <p>Already have an Account?<span onClick={() => setCurrentState("Login")}>Login here</span></p>
        }


      </form>
    </div>
  )
}

export default LoginPopUp
