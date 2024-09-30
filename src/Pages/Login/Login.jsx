import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import "../Login/login.css"
import Button from 'react-bootstrap/Button';
import userServices from "../../services/userServices";
import {Link, useNavigate} from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { InputGroup } from "react-bootstrap";

export default function Login({setUsername}){
  let [userInput,setUserInput] = useState({email:"",password:""});

  //For visible password type 
  let [visiblePswd,setVisiblePswd] = useState(false);
  let [Errors,setErrors] = useState({email:"",password:""});
  let[isSubmitted,setIssubmitted] = useState(false);
  let navigate = useNavigate();

  const handleChanges = (e)=>{
    const {name,value} = e.target;
    setUserInput({...userInput,[name]:value});
    validate(name,value);
  } 
  const validate = (name,value)=>{
    let error = Errors;
    switch(name){
      case 'email': 
              error.email = value ===''? 'Email is requiired':'' || !/\S+@\S+\.\S+/.test(value) ?'Enter valid email':''
        break;
      case 'password': 
              error.password = value ==='' ? 'Password is required':'' || value.length<6 ? 'Password must be at least 6 characters':''
        break;
        default:
          break;
    }
    return error;
  }

  const handleSubmit = (e,user)=>{
    e.preventDefault();
    setIssubmitted(true);
    const valid = Object.values(Errors).every(error => error==='') && 
                  Object.values(userInput).every(input => input!=='');
    Object.keys(user).forEach(key=>{
      const value = user[key];
      validate(key,value);
    })
    console.log(Errors);
    if(valid){
          validateUser(user);
          
    }
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
        navigate('/');
          setUserInput({email:"",password:""})
        }   
    }catch(error){
      if(error.response){
        toast.error(error.response.data);
      }
      toast.error("NetWork Error");
      console.log(error.response);
      
    }
  } 

  const parseJWT = (token)=>{
    if(!token){return};
    const base64Url = token.split('.')[1];
    return JSON.parse(window.atob(base64Url));
  }
  return (<>
  <ToastContainer
   position="top-right"
   autoClose={5000}
   hideProgressBar={false}
   closeOnClick
   rtl={false}
   pauseOnHover
   theme="colored"
   transition={Flip} // Corrected this part
 />
  <div id="login-form">
  <div className="login-con">
  <h1 >Login</h1>
  <Form onSubmit={(e)=>{handleSubmit(e,userInput)}}>
        <Form.Group className="mt-2" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" placeholder="Enter your email" name="email" value={userInput.email} onChange={handleChanges}/>
        </Form.Group>
        {isSubmitted && Errors.email? <small style={{color:"red",fontWeight:600}}>{Errors.email}</small>:''}
          <Form.Group className="mt-2" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control type={visiblePswd?"text":"password"} placeholder="Enter your password" name="password" value={userInput.password} onChange={handleChanges}/>
                <Button variant="primary" onClick={() => setVisiblePswd(!visiblePswd)}>
                  {!visiblePswd?<MdVisibility></MdVisibility>:<MdVisibilityOff></MdVisibilityOff>}
                </Button>
              </InputGroup>
            </Form.Group>
          
        {isSubmitted && Errors.password? <small className="errormgs" style={{color:"red",fontWeight:600}}>{Errors.password}</small>:''}
        <div className="button">
          <Button variant="primary" type="submit">Login</Button>
          <Link to='/'><Button variant="danger">Back</Button></Link>{' '}
        </div>
        <hr />
        <p style={{textAlign:"center"}}>Don't have an account?&nbsp;&nbsp;<Link to='/Signup' style={{fontSize:"small"}}>Register here</Link></p>
      </Form>
      {/* {JSON.stringify(userInput)}  */}
  </div>
  </div>
  </>)
};