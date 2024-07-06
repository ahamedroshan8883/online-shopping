import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import "../Login/login.css"
import Button from 'react-bootstrap/Button';
import userServices from "../../services/userServices";
import {Link, useNavigate} from "react-router-dom";


export default function Login({setUsername}){
  let [userInput,setUserInput] = useState({email:"",password:""});
  let [Errors,setErrors] = useState({email:"",password:""});
  let navigate = useNavigate();

  const handleChanges = (e)=>{
    const {name,value} = e.target;
    setUserInput({...userInput,[name]:value});
    const error = validate(name,value);
    setErrors({...Errors,[name]:error});
  } 
  const validate = (name,value)=>{
    let error = '';
    switch(name){
      case 'email':
        if(!value){
          error = 'Email is requiired';
        }else if(!/\S+@\S+\.\S+/.test(value)){
          error = 'Enter valid email'
        }
        break;
      case 'password':
        if(!value){
          error = 'Password is required';
        }else if(value.lenght<6){
          error = 'Password must be at least 6 characters';
        }
        break;
        default:
          break;
    }
    return error;
  }

  const handleSubmit = (e,user)=>{
    e.preventDefault();
    validateUser(user);
    setUserInput({email:"",password:""})
  }

  const validateUser = async(user)=>{
    try{
        const response = await userServices.login(user)
        console.log(response);
        if(response.status==200){
        const token = response.data
        let userData = parseJWT(token);
        console.log(userData);
        localStorage.setItem('token',token);
        localStorage.setItem('email',userData.email)
        localStorage.setItem('username',userData.username)
        setUsername(localStorage.getItem('username'));
        navigate('/')
        }   
    }catch(error){
      console.log(error);
    }
  } 

  const parseJWT = (token)=>{
    if(!token){return};
    const base64Url = token.split('.')[1];
    return JSON.parse(window.atob(base64Url));
  }
  return (<>
  <div id="login-form">
  <div className="login-con">
  <h1 className="m-3">Login</h1>
  <Form onSubmit={(e)=>{handleSubmit(e,userInput)}}>
        <Form.Group className="m-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" name="email" value={userInput.email} onChange={handleChanges}/>
        </Form.Group>
        <Form.Group className="m-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" name="password" value={userInput.password} onChange={handleChanges}/>
        </Form.Group>
        <div className="button m-3">
          <Button variant="primary" type="submit">Login</Button>{' '}
          <Link to='/'><Button variant="danger">Back</Button></Link>{' '}
        </div>
        <hr />
        <p style={{textAlign:"center"}}>Don't have an account?&nbsp;&nbsp;<Link to='/Signup'>Register here</Link></p>
      </Form>
      {JSON.stringify(Errors)}
  </div>
  </div>
  </>)
};