import React, { useState } from "react"
import "../signup/Signup.css"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import userServices from "../../services/userServices";

export default function Signup(){
    const Initialvalue = {
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
        mobile:"",
        gender:"male",
        role:"user"
    }
    let[userInput,setUserInput] = useState(Initialvalue);
    let [isSubmitted,setIssubmitted] = useState(false);
    let[Errors,setErrors] = useState({
      username:"",
      email:"",
      password:"",
      confirmpassword:"",
      mobile:"",
  })
    const validate = (name,value)=>{
      let errors = Errors;
      switch(name){
        case 'username':
          errors.username = value ===''?'Username is required':'';
        break;
        case 'email':
          errors.email =  value ===''?'Email is required':''|| !/\S+@\S+\.\S+/.test(value) ?'Enter valid email':'';
        break;
        case 'password':
          errors.password = value ==='' ? 'Password is required':'' || value.length<6 ? 'Password must be at least 6 characters':''
        break;
        case 'confirmpassword':
          errors.confirmpassword = value ===''?'Confirmpassword is required':'' || value !== userInput.password ? 'Confirm pasword is not match with password':'';
        break;
        case 'mobile':
          errors.mobile = value === ''?'Mobile number is required':'' || isNaN(value)?'In valid mobile no':'';
        break;
        default:
        return errors;        
      }
    }
    const handlechanges = (e)=>{
        const{name,value} = e.target;
        setUserInput({...userInput,[name]:value});
        validate(name,value);
    }
    const handleSubmit = async(e,userInput)=>{
      e.preventDefault();
      setIssubmitted(true);
      const valid = Object.values(Errors).every(value=>value=='')&&
      Object.values(userInput).every(input => input!=='');
      Object.keys(userInput).forEach(key=>{
        const value = userInput[key];
        validate(key,value);
      })
      console.log(valid);
      if(valid){
        const response = await userServices.signup(userInput);
        setUserInput(Initialvalue);
        console.log(response.data);
      }
    }
  return (<>
  <div id="Signup-form">
    <div className="Signup-con">
        <h3>Signup</h3>
        <Form onSubmit={(e)=>{handleSubmit(e,userInput)}}>
      <Form.Group className="mt-1" controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" placeholder="Enter name" value={userInput.username} onChange={handlechanges}/>
      </Form.Group>
      {isSubmitted && Errors.username ? <small className="errorMessage">{Errors.username}</small>:''}
      <Form.Group className="mt-1" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" value={userInput.email} onChange={handlechanges}/>
      </Form.Group>
      {isSubmitted && Errors.email ? <small className="errorMessage">{Errors.email}</small>:''}
      <Form.Group className="mt-1" controlId="formGroupPassword">
        <Form.Label>Mobile No.</Form.Label>
        <Form.Control type="text" name="mobile" placeholder="Enter mobile no" value={userInput.mobile} onChange={handlechanges}/>
      </Form.Group>
      {isSubmitted && Errors.mobile ? <small className="errorMessage">{Errors.mobile}</small>:''}<br></br>
      <Row>
      <Col>
        <Form.Group className="mt-1" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" value={userInput.password} onChange={handlechanges}/>
        </Form.Group>
      {isSubmitted && Errors.password ? <small className="errorMessage">{Errors.password}</small>:''}
      </Col>
      <Col>
        <Form.Group className="mt-1" controlId="formGroupPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" name="confirmpassword" value={userInput.confirmpassword} onChange={handlechanges} placeholder="Confirm password" />
        </Form.Group>
      {isSubmitted && Errors.confirmpassword ? <small className="errorMessage">{Errors.confirmpassword}</small>:''}
      </Col>
      </Row>
      <Form.Check inline label="Male" className="mt-1" checked name="gender" value={userInput.gender} type="radio"onChange={handlechanges}/>
      <Form.Check inline label="Female" name="gender" value={userInput.gender} type="radio"onChange={handlechanges}/>
      <div className="button m-1">
          <Button variant="primary" type="submit">Signup</Button>{' '}
          <Link to='/'><Button variant="danger">Back</Button></Link>{' '}
      </div>
    </Form>
    </div>
  </div>
  </>)
};