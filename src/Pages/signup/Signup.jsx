import React, { useState } from "react"
import "../signup/Signup.css"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function Signup(){
    const Initialvalue = {
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        mobile:"",
        gender:"",
        role:""
    }
    let[userInput,setUserInput] = useState(Initialvalue);
    let[Isvalid,setIsvalid] = useState({
      username:true,
      email:true,
      password:true,
      confirmPassword:true,
      mobile:true
    });
    const handlechanges = (e)=>{
        const{name,value} = e.target;
        setUserInput({...userInput,[name]:value});
        if((value===""||null)){
            setIsvalid({...Isvalid,[name]:!name});
        }
    }
  return (<>
  <div id="Signup-con">
    <div className="Signup-form">
        <h1>Signup</h1>
        <Form>
      <Form.Group className="mt-3" controlId="formGroupEmail">
        <Form.Label>Full name</Form.Label>
        <Form.Control type="text" name="username" placeholder="Enter fullname" value={userInput.username} onChange={handlechanges}/>
      </Form.Group>
      {!Isvalid.username?<p className="errorMessage">Username required</p>:''}
      <Form.Group className="mt-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" value={userInput.email} onChange={handlechanges}/>
      </Form.Group>
      {!Isvalid.email?<p className="errorMessage">Email required</p>:''}
      <Row>
      <Col>
        <Form.Group className="mt-1" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" value={userInput.password} onChange={handlechanges}/>
        </Form.Group>
        {!Isvalid.password?<p className="errorMessage">Password required</p>:''}
      </Col>
      <Col>
        <Form.Group className="mt-1" controlId="formGroupPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" name="confirmPassword" value={userInput.confirmPassword} onChange={handlechanges} placeholder="Confirm password" />
        </Form.Group>
        {!Isvalid.confirmPassword?<p className="errorMessage">Confirm password required</p>:''}
      </Col>
      </Row>
      <Form.Group className="mt-1" controlId="formGroupPassword">
        <Form.Label>Mobile No.</Form.Label>
        <Form.Control type="text" name="mobile" placeholder="Enter mobile no" value={userInput.mobile} onChange={handlechanges}/>
      </Form.Group>
      {!Isvalid.mobile?<p className="errorMessage">Mobile required</p>:''}
      <Form.Check inline label="Male" className="mt-1" checked name="gender" value={userInput.gender} type="radio"onChange={handlechanges}/>
      <Form.Check inline label="Female" name="gender" value={userInput.gender} type="radio"onChange={handlechanges}/>
      <div className="button m-1">
          <Button variant="primary" type="submit">Login</Button>{' '}
          <Link to='/'><Button variant="danger">Back</Button></Link>{' '}
      </div>
    </Form>
    <hr />
        <p style={{textAlign:"center"}}>Already have an account?&nbsp;&nbsp;<Link to='/Login'>Login</Link></p>
    </div>
    
  </div>
  {JSON.stringify(Isvalid)}
  </>)
};